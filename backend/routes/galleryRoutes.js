import express from 'express';
import { getGallery, uploadMedia, deleteMedia } from '../controllers/galleryController.js';
import { verifyAdminToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getGallery);
// Supports both single and multiple uploads (up to 20 files at once)
router.post('/upload', verifyAdminToken, upload.array('media', 20), uploadMedia);
router.delete('/:id', verifyAdminToken, deleteMedia);

export default router;
