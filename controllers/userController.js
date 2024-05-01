import { User } from "../models/users.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";


export const createUser = async (req, res) => {
  const {
    username, email, password,
  } = req.body;

  try {
    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({
        error: 'User with that email already exists',
      });
    }

    const user = await User.create({
      username,
      email,
      password: hashPassword(password),
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Error creating user',
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        error: 'User with that email does not exist',
      });
    }

    const rightPassword = comparePassword(password, user.password);

    if (!rightPassword) {
      return res.status(401).json({
        error: 'Invalid login credentials',
      });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };
  
    const loginToken = await generateToken(payload);

    return res.status(200).json({
      message: 'User logged in successfully',
      user: {
        username: user.username,
        email: user.email,
      },
      token: loginToken,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Error logging in user',
    });
  }
};
