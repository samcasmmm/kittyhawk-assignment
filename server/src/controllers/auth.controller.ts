import { Request, Response } from 'express';
import { UserModel } from '@/models/user.model';
import bcrypt from 'bcryptjs';

import { generateAuthToken } from '@/utils/jwt';

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body as {
      email?: string;
      password?: string;
      name?: string;
    };

    if (!email || !password) {
      return res.build
        .withStatus(400)
        .withMessage('Email and password are required')
        .send();
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await UserModel.findOne({ email: normalizedEmail }).lean();
    if (existing) {
      return res.build
        .withStatus(400)
        .withMessage('Email already in use')
        .send();
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      email: normalizedEmail,
      passwordHash,
      name: name?.trim(),
    });

    const token = generateAuthToken({
      id: user._id.toString(),
      email: user.email,
    });

    return res.build
      .withStatus(201)
      .withMessage('Account created successfully')
      .withData({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      })
      .send();
  } catch (error) {
    console.error('[signup] error:', error);
    return res.build
      .withStatus(500)
      .withMessage('Server error')
      .withExtra({
        error,
      })
      .send();
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.build
        .withStatus(400)
        .withMessage('Email and password are required')
        .send();
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await UserModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res.build
        .withStatus(400)
        .withMessage('Invalid credentials')
        .send();
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.build
        .withStatus(400)
        .withMessage('Invalid credentials')
        .send();
    }

    const token = generateAuthToken({
      id: user._id.toString(),
      email: user.email,
    });

    return res.build
      .withStatus(200)
      .withMessage('Login successful')
      .withData({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      })
      .send();
  } catch (error) {
    console.error('[login] error:', error);
    return res.build.withStatus(500).withMessage('Server error').send();
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    console.log(req.userId);
    if (!userId) {
      return res.build
        .withStatus(401)
        .withMessage('Unauthorized: No user ID provided')
        .send();
    }

    const user = await UserModel.findById(userId)
      .select('-passwordHash')
      .lean();
    if (!user) {
      return res.build.withStatus(404).withMessage('User not found').send();
    }

    return res.build
      .withStatus(200)
      .withMessage('User profile retrieved successfully')
      .withData(user)
      .send();
  } catch (error) {
    console.error('[getProfile] error:', error);
    return res.build.withStatus(500).withMessage('Server error').send();
  }
};
