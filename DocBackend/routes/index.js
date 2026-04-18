const express = require('express');

const router = express.Router();
const { apiLimiter, authLimiter } = require('../middlewares/rateLimit');

router.use(apiLimiter);

router.use('/auth', authLimiter, require('./authRoute'));
router.use('/user', require('./userRoute'));
router.use('/documents', require('./documents'));
router.use('/analysis', require('./analysis'));

module.exports = router;
