import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

// Google OAuth routes
router.get('/google', authController.googleAuth.bind(authController));
router.get('/google/callback', authController.googleCallback.bind(authController));

// User Session & Standard Auth routes
router.get('/me', authController.getMe.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));
router.post('/logout', authController.logout.bind(authController));

export default router;
