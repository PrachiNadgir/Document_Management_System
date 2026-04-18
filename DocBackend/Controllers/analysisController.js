const Document = require('../Models/Document');
const Analysis = require('../Models/Analysis');
const User = require('../Models/UserModel');
const orchestrator = require('../services/analysisOrchestrator');
const fs = require('fs');
const {
  summariseDocument,
  analyseSentiment,
  extractKeywords,
  translateText,
  readabilityScore,
} = require('../services/openaiService');
const { categoriseDocument, extractEntities } = require('../services/huggingfaceService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// POST /api/analysis/run
const runAnalysis = asyncHandler(async (req, res) => {
  const { documentId, mode = 'all', language = 'en' } = req.body;

  if (!documentId) return sendError(res, 400, 'documentId is required');

  await User.findById(req.user._id);

  const doc = await Document.findOne({ _id: documentId, user: req.user._id });
  if (!doc) return sendError(res, 404, 'Document not found');
  if (!doc.extractedText) {
    return sendError(
      res,
      400,
      'Document has no extractable text. Handwritten or scanned documents are not supported yet unless they already contain OCR/selectable text.'
    );
  }

  // Create pending analysis record
  const analysis = await Analysis.create({
    user: req.user._id,
    document: documentId,
    mode,
    language,
    status: 'processing',
  });

  // Update doc status
  await Document.findByIdAndUpdate(documentId, { status: 'processing' });

  // Run AI orchestration (async — responds immediately with analysisId)
  orchestrator.run(analysis._id, doc.extractedText, mode, language).then(async () => {
    const freshUser = await User.findById(req.user._id);
    await Document.findByIdAndUpdate(documentId, { status: 'done' });

    if (freshUser?.privacy?.autoDeleteFiles && doc.filePath) {
      try {
        if (fs.existsSync(doc.filePath)) fs.unlinkSync(doc.filePath);
      } catch (error) {
        console.warn('Auto-delete failed:', error.message);
      }
    }
  }).catch(async (err) => {
    await Analysis.findByIdAndUpdate(analysis._id, { status: 'failed', errorMessage: err.message });
    await Document.findByIdAndUpdate(documentId, { status: 'error' });
  });

  sendSuccess(res, 202, 'Analysis started', { analysisId: analysis._id, status: 'processing' });
});

// GET /api/analysis/:id
const getAnalysis = asyncHandler(async (req, res) => {
  let analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id })
    .populate('document', 'originalName fileType wordCount fileSize extractedText createdAt');

  if (!analysis) return sendError(res, 404, 'Analysis not found');
  analysis = await ensureAnalysisData(analysis);
  sendSuccess(res, 200, 'Analysis retrieved', { analysis });
});

// GET /api/analysis — list user's analyses
const listAnalyses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, documentId } = req.query;
  const filter = { user: req.user._id };

  if (documentId) {
    filter.document = documentId;
  }

  if (status) {
    const statuses = String(status)
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (statuses.length > 0) {
      filter.status = { $in: statuses };
    }
  }

  const analyses = await Analysis.find(filter)
    .populate('document', 'originalName fileType')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Analysis.countDocuments(filter);
  sendSuccess(res, 200, 'Analyses listed', { analyses, total });
});

// POST /api/analysis/:id/qa — Document Q&A
const askQuestion = asyncHandler(async (req, res) => {
  const { question } = req.body;
  if (!question || !question.trim()) return sendError(res, 400, 'Question is required');

  const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id })
    .populate('document', 'extractedText');

  if (!analysis) return sendError(res, 404, 'Analysis not found');

  const { answerQuestion } = require('../services/openaiService');
  const answer = await answerQuestion(analysis.document.extractedText, question);

  // Save to Q&A history
  analysis.qaHistory.push({ question, answer });
  await analysis.save();

  sendSuccess(res, 200, 'Answer generated', { question, answer });
});

// POST /api/analysis/batch — batch multiple docs
const batchAnalyse = asyncHandler(async (req, res) => {
  const { documentIds, mode = 'all', language = 'en' } = req.body;
  if (!documentIds || !Array.isArray(documentIds) || documentIds.length === 0) {
    return sendError(res, 400, 'documentIds array is required');
  }

  const user = await User.findById(req.user._id);
  if ((user?.plan || 'free') === 'free') {
    return sendError(res, 403, 'Batch processing is available on Pro and Enterprise plans');
  }

  const jobs = await Promise.all(
    documentIds.map(async (docId) => {
      const doc = await Document.findOne({ _id: docId, user: req.user._id });
      if (!doc) return { docId, error: 'Not found' };

      const analysis = await Analysis.create({
        user: req.user._id,
        document: docId,
        mode,
        language,
        status: 'processing',
      });

      orchestrator.run(analysis._id, doc.extractedText, mode, language).catch(console.error);
      return { docId, analysisId: analysis._id };
    })
  );

  sendSuccess(res, 202, 'Batch analysis started', { jobs });
});

// GET /api/analysis/activity
const getActivity = asyncHandler(async (req, res) => {
  const analyses = await Analysis.find({ user: req.user._id })
    .populate('document', 'originalName')
    .sort({ createdAt: -1 })
    .limit(20);

  const items = analyses.map((analysis) => ({
    id: analysis._id,
    analysisId: analysis._id,
    documentId: analysis.document?._id || null,
    documentName: analysis.document?.originalName || 'Document',
    mode: analysis.mode,
    status: analysis.status,
    language: analysis.language,
    createdAt: analysis.createdAt,
    updatedAt: analysis.updatedAt,
    message:
      analysis.status === 'processing'
        ? 'Analysis is running'
        : analysis.status === 'completed'
          ? 'Analysis finished'
          : analysis.status === 'failed'
            ? analysis.errorMessage || 'Analysis failed'
            : 'Analysis queued',
  }));

  sendSuccess(res, 200, 'Activity retrieved', { items });
});

// POST /api/analysis/:id/selection
const actOnSelection = asyncHandler(async (req, res) => {
  const { text, action = 'translate', language = 'en' } = req.body;
  const trimmed = String(text || '').trim();

  if (!trimmed) return sendError(res, 400, 'Selected text is required');

  const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id });
  if (!analysis) return sendError(res, 404, 'Analysis not found');

  if (action === 'search') {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
    return sendSuccess(res, 200, 'Search link created', { searchUrl });
  }

  const translation = await translateText(trimmed, language || analysis.language || 'en');
  sendSuccess(res, 200, 'Selection translated', { translation });
});

module.exports = { runAnalysis, getAnalysis, listAnalyses, askQuestion, batchAnalyse, getActivity, actOnSelection };

async function ensureAnalysisData(analysis) {
  const text = analysis.document?.extractedText;
  if (analysis.status !== 'completed' || !text) return analysis;

  const updates = {};

  if (!analysis.summary && (analysis.mode === 'summarization' || analysis.mode === 'all')) {
    updates.summary = await summariseDocument(text, analysis.language || 'en');
  }

  if ((!analysis.sentiment?.overall || totalsZero(analysis.sentiment)) && (analysis.mode === 'sentiment' || analysis.mode === 'all')) {
    updates.sentiment = await analyseSentiment(text);
  }

  if ((!analysis.categories || analysis.categories.length === 0) && (analysis.mode === 'categorization' || analysis.mode === 'all')) {
    updates.categories = await categoriseDocument(text, analysis.language || 'en');
  }

  if ((!analysis.keywords || analysis.keywords.length === 0) && analysis.mode === 'all') {
    updates.keywords = await extractKeywords(text);
  }

  if ((!analysis.entities || analysis.entities.length === 0) && analysis.mode === 'all') {
    updates.entities = await extractEntities(text, analysis.language || 'en');
  }

  if ((!analysis.readability?.wordCount || analysis.readability?.fleschKincaid === null) && analysis.mode === 'all') {
    updates.readability = {
      fleschKincaid: readabilityScore(text),
      wordCount: text.trim().split(/\s+/).filter(Boolean).length,
    };
  }

  if (!analysis.translation && analysis.language && analysis.language !== 'en') {
    updates.translation = await translateText(text.slice(0, 2500), analysis.language);
  }

  if (Object.keys(updates).length === 0) return analysis;

  analysis = await Analysis.findByIdAndUpdate(analysis._id, updates, { new: true }).populate(
    'document',
    'originalName fileType wordCount fileSize extractedText createdAt'
  );
  return analysis;
}

function totalsZero(sentiment) {
  if (!sentiment) return true;
  return (
    Number(sentiment.positive || 0) === 0 &&
    Number(sentiment.negative || 0) === 0 &&
    Number(sentiment.neutral || 0) === 0
  );
}
