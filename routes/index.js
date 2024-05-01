import express from 'express';
import { uploadMedia } from '../controllers/mediaController.js';
import { verifyToken } from '../utils/jwt.js';
import { catchErrors } from '../utils/errors.js';
import { userCanUpload } from '../middlewares/mediaMiddleware.js';
import { createUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// auth
router.post('/register', createUser);
router.post('/login', loginUser);

// media
router.post('/upload-media', catchErrors(verifyToken), userCanUpload, uploadMedia);

export default router;
