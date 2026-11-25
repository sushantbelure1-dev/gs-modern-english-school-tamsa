import express from 'express';
import { login, verifySession } from '../controllers/authController.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', verifyAdminToken, verifySession);

export default router;
