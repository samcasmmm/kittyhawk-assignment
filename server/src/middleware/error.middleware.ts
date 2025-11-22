import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  status?: number;
}

export const notFound = (req: any, _res: any, next: any) => {
  const error: AppError = new Error(`Not found - ${(req as any).originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (err: AppError, req: any, res: any, _next: any) => {
  const statusCode =
    err.status && err.status !== 200
      ? err.status
      : (res as any).statusCode !== 200 && (res as any).statusCode !== 0
      ? (res as any).statusCode
      : 500;

  (res as any).build
    .withStatus(statusCode)
    .withMessage(err.message || 'Internal Server Error')
    .withData(null)
    .withExtra({
      path: (req as any).originalUrl,
      method: (req as any).method,
    })
    .send();
};
