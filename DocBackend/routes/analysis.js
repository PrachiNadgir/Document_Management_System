const express = require('express');
const router = express.Router();

const {
  runAnalysis,
  getAnalysis,
  listAnalyses,
  askQuestion,
  batchAnalyse,
  getActivity,
  actOnSelection,
} = require('../Controllers/analysisController');
const isAuth = require('../middlewares/isAuth');
const { analysisLimiter } = require('../middlewares/rateLimit');

const { protect } = isAuth;

router.use(protect);

// POST /api/analysis/run
router.post('/run', analysisLimiter, runAnalysis);

// POST /api/analysis/batch
router.post('/batch', analysisLimiter, batchAnalyse);

// GET /api/analysis/activity
router.get('/activity', getActivity);

// GET  /api/analysis
router.get('/', listAnalyses);

// POST /api/analysis/:id/selection
router.post('/:id/selection', actOnSelection);

// GET  /api/analysis/:id
router.get('/:id', getAnalysis);

// POST /api/analysis/:id/qa
router.post('/:id/qa', askQuestion);

module.exports = router;
