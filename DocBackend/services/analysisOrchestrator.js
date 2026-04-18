const Analysis = require('../Models/Analysis');
const {
  summariseDocument,
  analyseSentiment,
  extractKeywords,
  translateText,
  readabilityScore,
  highlightSentiment // ✅ ADD THIS
} = require('./openaiService');
const { categoriseDocument, extractEntities } = require('./huggingfaceService');

const run = async (analysisId, text, mode, language) => {
  const startTime = Date.now();

  try {
    const updates = {};
    const failures = [];
    const tasks = [];

    if (mode === 'summarization' || mode === 'all') {
  tasks.push(
    summariseDocument(text, language)
      .then((summary) => {
        updates.summary = summary || "Summary could not be generated.";
      })
      .catch((error) => {
        failures.push(`summary: ${error.message}`);
        updates.summary = "Summary could not be generated.";
      })
  );
}
    if (mode === 'sentiment' || mode === 'all') {
      tasks.push(
        analyseSentiment(text)
          .then((sentiment) => {
            if (!sentiment || !sentiment.overall) {
              updates.sentiment = {
                overall: "neutral",
                positive: 0,
                neutral: 100,
                negative: 0
              };
            } else {
              updates.sentiment = sentiment;
            }
          })
          .catch((error) => {
            failures.push(`sentiment: ${error.message}`);
          })
      );
    }

    if (mode === 'categorization' || mode === 'all') {
      tasks.push(
        categoriseDocument(text, language)
          .then((categories) => {
            updates.categories = categories;
          })
          .catch((error) => {
            failures.push(`categorization: ${error.message}`);
          })
      );
    }

    if (mode === 'all') {
      tasks.push(
        extractKeywords(text)
          .then((keywords) => {
            updates.keywords = keywords;
          })
          .catch((error) => {
            failures.push(`keywords: ${error.message}`);
          }),
        extractEntities(text, language)
          .then((entities) => {
            updates.entities = entities;
          })
          .catch((error) => {
            failures.push(`entities: ${error.message}`);
          })
      );

      

      const fk = readabilityScore(text);
      const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      updates.readability = { fleschKincaid: fk, wordCount };

      tasks.push(
  highlightSentiment(text)
    .then((data) => {
      updates.highlights = data;
    })
    .catch((error) => {
      failures.push(`highlights: ${error.message}`);
    })
);
    }

    if (language && language !== 'en') {
      tasks.push(
        translateText(text.slice(0, 2500), language)
          .then((translation) => {
            updates.translation = translation;
          })
          .catch((error) => {
            failures.push(`translation: ${error.message}`);
          })
      );
    }

    await Promise.all(tasks);

    const hasPrimaryResult =
      !!updates.summary ||
      !!updates.translation ||
      (Array.isArray(updates.categories) && updates.categories.length > 0) ||
      (Array.isArray(updates.keywords) && updates.keywords.length > 0) ||
      (Array.isArray(updates.entities) && updates.entities.length > 0) ||
      !!updates.sentiment?.overall ||
      !!updates.readability;

    updates.status = hasPrimaryResult ? 'completed' : 'failed';
    updates.processingTimeMs = Date.now() - startTime;
    updates.errorMessage = failures.length > 0 ? failures.join(' | ') : null;

    await Analysis.findByIdAndUpdate(analysisId, updates);

    if (!hasPrimaryResult) {
      throw new Error(updates.errorMessage || 'No analysis results were generated');
    }

    console.log(`Analysis ${analysisId} completed in ${updates.processingTimeMs}ms`);
  } catch (err) {
    console.error(`Analysis ${analysisId} failed:`, err.message);
    await Analysis.findByIdAndUpdate(analysisId, {
      status: 'failed',
      errorMessage: err.message,
    });
    throw err;
  }
};

module.exports = { run };
