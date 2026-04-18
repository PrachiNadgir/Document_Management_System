const fs = require('fs');
const path = require('path');
const Document = require('../Models/Document');
const Analysis = require('../Models/Analysis');
const { extractText } = require('../services/fileService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// POST /api/documents/upload
const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) return sendError(res, 400, 'No file uploaded');
  if (!req.file.size) {
    try {
      if (req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    } catch (_error) {}
    return sendError(res, 400, 'Uploaded file is empty. Please choose a file that contains text.');
  }

  const ext = path.extname(req.file.originalname).toLowerCase().replace('.', '');

  // Extract raw text from the uploaded file
  let extractedText = '';
  try {
    extractedText = await extractText(req.file.path, ext);
  } catch (err) {
    console.error('Text extraction failed:', err.message);
  }

  const wordCount = extractedText.trim().split(/\s+/).filter(Boolean).length;

  const doc = await Document.create({
    user: req.user._id,
    originalName: req.file.originalname,
    storedName: req.file.filename,
    filePath: req.file.path,
    fileType: ext,
    fileSize: req.file.size,
    extractedText,
    wordCount,
    status: 'uploaded',
  });

  sendSuccess(res, 201, 'Document uploaded', { document: doc });
});

// GET /api/documents
const getDocuments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, type } = req.query;
  const filter = { user: req.user._id };
  if (type) filter.fileType = type;

  const docs = await Document.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .select('-extractedText -filePath');

  const total = await Document.countDocuments(filter);

  sendSuccess(res, 200, 'Documents retrieved', { documents: docs, total, page: Number(page) });
});

// GET /api/documents/:id
const getDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, user: req.user._id });
  if (!doc) return sendError(res, 404, 'Document not found');
  sendSuccess(res, 200, 'Document retrieved', { document: doc });
});

// DELETE /api/documents/:id
const deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, user: req.user._id });
  if (!doc) return sendError(res, 404, 'Document not found');

  // Remove file from disk
  try {
    if (fs.existsSync(doc.filePath)) fs.unlinkSync(doc.filePath);
  } catch (_) {}

  await Analysis.deleteMany({ document: doc._id, user: req.user._id });
  await doc.deleteOne();
  sendSuccess(res, 200, 'Document deleted');
});

// PATCH /api/documents/:id/collaborators
const updateCollaborators = asyncHandler(async (req, res) => {
  const collaborators = Array.isArray(req.body.collaborators) ? req.body.collaborators : [];

  if (collaborators.length > 3) {
    return sendError(res, 400, 'You can add up to 3 collaborators per document.');
  }

  const sanitized = collaborators
    .map((partner) => ({
      name: String(partner?.name || '').trim(),
      email: String(partner?.email || '').trim().toLowerCase(),
      role: String(partner?.role || 'editor').trim() || 'editor',
    }))
    .filter((partner) => partner.name && partner.email);

  const uniqueEmails = new Set(sanitized.map((partner) => partner.email));
  if (uniqueEmails.size !== sanitized.length) {
    return sendError(res, 400, 'Collaborator emails must be unique.');
  }

  const doc = await Document.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { collaborators: sanitized },
    { new: true, runValidators: true }
  ).select('-filePath');

  if (!doc) return sendError(res, 404, 'Document not found');

  sendSuccess(res, 200, 'Collaborators updated', { document: doc });
});

module.exports = { uploadDocument, getDocuments, getDocument, deleteDocument, updateCollaborators };
