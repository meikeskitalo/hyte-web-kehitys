import express from 'express';
import {getMe, login} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handler.js';


const authRouter = express.Router();

// post to /api/auth/login
authRouter.post('/login',
body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
body('password').trim().isLength({min: 8, max: 120}),
validationErrorHandler,
login);
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
