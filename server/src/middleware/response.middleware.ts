import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Response {
      build: ResponseBuilder;
    }
  }
}

class ResponseBuilder {
  private res: Response;
  private statusCode = 200;
  private message = 'Success';
  private data: any = null;
  private extra: any = null;

  constructor(res: Response) {
    this.res = res;
  }

  withStatus(status: number): this {
    this.statusCode = status;
    return this;
  }

  withMessage(message: string): this {
    this.message = message;
    return this;
  }

  withData(data: any): this {
    this.data = data;
    return this;
  }

  withExtra(extra: any): this {
    this.extra = extra;
    return this;
  }

  send(): void {
    const body: Record<string, any> = {
      message: this.message,
      data: this.data,
    };

    if (this.extra !== null && this.extra !== undefined) {
      body.extra = this.extra;
    }
    this.res.status(this.statusCode).json(body);
  }
}

function ResponseBuilderMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  res.build = new ResponseBuilder(res);
  next();
}

export default ResponseBuilderMiddleware;
