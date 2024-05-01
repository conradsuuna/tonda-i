import { User } from "../models/users.js";

export const userCanUpload = async (req, res, next) => {
  try {
    const {userId} = req.userId;

    const user = await User.findByPk(userId);

    if (user.userRole === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
