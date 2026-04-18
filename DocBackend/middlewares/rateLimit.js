const rateLimit = require('express-rate-limit');

// General API limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth routes — stricter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, please try again in 15 minutes.' },
});

// Analysis routes — per user, based on plan in middleware
const analysisLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { success: false, message: 'Too many analysis requests. Slow down.' },
});

module.exports = { apiLimiter, authLimiter, analysisLimiter };
