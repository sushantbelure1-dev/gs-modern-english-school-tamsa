import express from 'express';
import { submitEnquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry } from '../controllers/enquiryController.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitEnquiry);
router.get('/', verifyAdminToken, getEnquiries);
router.put('/:id', verifyAdminToken, updateEnquiryStatus);
router.delete('/:id', verifyAdminToken, deleteEnquiry);

export default router;
