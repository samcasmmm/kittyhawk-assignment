import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
  throw new Error('JWT_SECRET environment variable is not set');
}
const JWT_SECRET = rawSecret;

export const generateAuthToken = (payload: { id: string; email: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyAuthToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
