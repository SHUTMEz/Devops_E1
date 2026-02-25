const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadctrl = require('../controllers/uploadController');
const auth = require('../middleware/authMiddleware');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/file', auth('evaluatee'), upload.single('file'), uploadctrl.uploadcontroller);
router.delete('/file/:id', auth('evaluatee'), uploadctrl.deleteController);

module.exports = router;
