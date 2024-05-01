import express from 'express';
import { getMedia, uploadMedia } from '../controllers/mediaController.js';
import { verifyToken } from '../utils/jwt.js';
import { catchErrors } from '../utils/errors.js';
import { uploadMiddleware, userCanUpload } from '../middlewares/mediaMiddleware.js';
import { createUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

const upload = uploadMiddleware();

// auth
router.post('/register', createUser);
router.post('/login', loginUser);

// media
router.post(
  '/upload-media',
  catchErrors(verifyToken),
  userCanUpload,
  upload.single('file'),
  uploadMedia
);
router.get('/get-media', getMedia);

export default router;
