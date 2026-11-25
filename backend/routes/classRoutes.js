import express from 'express';
import { getClasses, getClassBySlug } from '../controllers/classController.js';

const router = express.Router();

router.get('/', getClasses);
router.get('/:slug', getClassBySlug);

export default router;
