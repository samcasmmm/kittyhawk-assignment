import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  status?: number;
}

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error: AppError = new Error(`Not found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    err.status && err.status !== 200
      ? err.status
      : res.statusCode !== 200 && res.statusCode !== 0
      ? res.statusCode
      : 500;

  (res as any).build
    .withStatus(statusCode)
    .withMessage(err.message || 'Internal Server Error')
    .withData(null)
    .withExtra({
      path: req.originalUrl,
      method: req.method,
    })
    .send();
};
