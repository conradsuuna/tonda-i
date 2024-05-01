import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET,
};

export const generateToken = async (payload) => jwt.sign(payload, config.jwtSecret, {
  expiresIn: '24h',
});

export const validateToken = (token) => jwt.verify(token, config.jwtSecret);

export const passwordResetTokenGenerate = async (payload) => jwt.sign(payload, config.jwtSecret, {
  expiresIn: '1h',
});

export const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Token is not provided!' });
  }

  try {
    [, token] = token.split(' ');
    const decoded = jwt.verify(token, config.jwtSecret);
    if (!decoded) {
      return res.status(401).send({ message: 'Invalid token provided' });
    }
    req.userID = decoded.user.id;

    return next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token provided' });
  }
};
