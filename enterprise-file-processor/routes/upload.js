const express = require('express');
const multer = require('multer');
const router = express.Router();
const { requireAuth } = require('./auth');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/upload', requireAuth, (req, res) => {
    res.render('upload', { title: 'File Upload' });
});

router.post('/upload', requireAuth, upload.single('file'), (req, res) => {
    res.json({ success: true, file: req.file });
});

module.exports = router;