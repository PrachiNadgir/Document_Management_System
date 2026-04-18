const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalName: { type: String, required: true },
    storedName:   { type: String, required: true },
    filePath:     { type: String, required: true },
    fileType:     { type: String, enum: ['txt', 'pdf', 'docx'], required: true },
    fileSize:     { type: Number, required: true }, // bytes
    extractedText:{ type: String, default: '' },
    wordCount:    { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['uploaded', 'processing', 'done', 'error'],
      default: 'uploaded',
    },
    collaborators: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          email: { type: String, required: true, trim: true, lowercase: true },
          role: { type: String, default: 'editor', trim: true },
        },
      ],
      default: [],
      validate: {
        validator: (value) => value.length <= 3,
        message: 'A document can have up to 3 collaborators.',
      },
    },
  },
  { timestamps: true }
);

// Auto-delete file path info if user privacy.autoDeleteFiles
documentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 }); // 30-day TTL

module.exports = mongoose.model('Document', documentSchema);
