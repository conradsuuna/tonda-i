import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from 'cloudinary';
import { User } from "../models/users.js";
import multer from "multer";
import dotenv from 'dotenv';

dotenv.config();


export const userCanUpload = async (req, res, next) => {
  try {
    const { userID } = req;

    const user = await User.findByPk(userID);

    if (user.userRole === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadMiddleware = () => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
      console.log(req);
      const publicId = `${file.fieldname}-${Date.now()}`;

      return {
        folder: 'tonda-i',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        public_id: publicId,
      };
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 20 * 1024 * 1024, // keep images size < 20 MB
    },
  });
}
