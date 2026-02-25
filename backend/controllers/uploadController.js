const db = require('../db/knex');
const fs = require('fs');
const path = require('path');

const ALLOWED_MIME = new Set(['application/pdf', 'image/png', 'image/jpeg', 'image/webp']);
const ALLOWED_EXT = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.webp']);

exports.uploadcontroller = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.' });
    }

    const ext = path.extname(req.file.originalname || '').toLowerCase();
    if (!ALLOWED_MIME.has(req.file.mimetype) || !ALLOWED_EXT.has(ext)) {
      if (req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(415).json({ error: 'UNSUPPORTED_MEDIA_TYPE' });
    }

    const { period_id, evaluatee_id, indicator_id, evidence_type_id, result_id } = req.body;

    const [id] = await db('attachments').insert({
      period_id: Number(period_id),
      evaluatee_id: Number(evaluatee_id || req.user.id),
      indicator_id: Number(indicator_id),
      evidence_type_id: Number(evidence_type_id),
      result_id: result_id ? Number(result_id) : null,
      file_name: req.file.originalname,
      mime_type: req.file.mimetype,
      size_bytes: req.file.size,
      storage_path: req.file.path,
    });

    return res.send({ message: 'File uploaded successfully.', id, fileInfo: req.file });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteController = async (req, res) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await db('attachments').where({ id: fileId, evaluatee_id: userId }).first();

    if (!file) {
      return res.status(404).json({ message: 'File not found or unauthorized' });
    }

    if (file.storage_path && fs.existsSync(file.storage_path)) {
      try {
        fs.unlinkSync(file.storage_path);
      } catch (err) {
        console.error('File delete error:', err);
      }
    }

    await db('attachments').where({ id: fileId }).del();

    return res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
