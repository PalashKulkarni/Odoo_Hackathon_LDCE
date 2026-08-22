import { Router } from 'express';
import { copilotController } from '../controllers/copilot.controller';

const router = Router();

router.post('/chat', copilotController.chat.bind(copilotController));

export default router;
