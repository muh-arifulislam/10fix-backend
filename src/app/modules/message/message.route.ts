import { Router } from 'express';
import { MessageControllers } from './message.controller';

const router = Router();

router.post('/sent-customer-email', MessageControllers.sendEmailFromCustomer);

export const MessageRoutes = router;
