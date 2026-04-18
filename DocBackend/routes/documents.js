const express = require('express');
const router = express.Router();

const { uploadDocument, getDocuments, getDocument, deleteDocument, updateCollaborators } = require('../Controllers/documentController');
const isAuth = require('../middlewares/isAuth');
const upload = require('../middlewares/upload');

const { protect } = isAuth;

// All routes require auth
router.use(protect);

// POST /api/documents/upload
router.post('/upload', upload.single('file'), uploadDocument);

// GET  /api/documents
router.get('/', getDocuments);

// GET  /api/documents/:id
router.get('/:id', getDocument);

// PATCH /api/documents/:id/collaborators
router.patch('/:id/collaborators', updateCollaborators);

// DELETE /api/documents/:id
router.delete('/:id', deleteDocument);

module.exports = router;
