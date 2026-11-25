import express from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { verifyAdminToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', verifyAdminToken, upload.single('featured_image'), createEvent);
router.put('/:id', verifyAdminToken, upload.single('featured_image'), updateEvent);
router.delete('/:id', verifyAdminToken, deleteEvent);

export default router;
