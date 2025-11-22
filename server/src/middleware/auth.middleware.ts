import { Request, Response, NextFunction } from 'express';
import { verifyAuthToken } from '@/utils/jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ error: 'Authorization header missing' });

  const token = header.split(' ')[1];
  try {
    const payload = verifyAuthToken(token) as {
      id: string;
      email: string;
    };
    req.userId = payload.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
