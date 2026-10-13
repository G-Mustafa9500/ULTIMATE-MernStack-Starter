import { Router } from 'express';
import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Public
router.post('/register',       register);
router.post('/login',          login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected (JWT required)
router.get ('/me',              protect, getMe);
router.put ('/update-profile',  protect, updateProfile);
router.put ('/change-password', protect, changePassword);

export default router;
