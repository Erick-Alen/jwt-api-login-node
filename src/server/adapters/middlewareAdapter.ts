import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../../app/interfaces/IMiddleware';

// currying function
// to adapt the controller to the route
export const middlewareAdapter = (middleware: IMiddleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      headers: request.headers as Record<string, string>,
    });

    if ('statusCode' in result) {
      return response.status(result.statusCode).json(result.body);
    }

    request.metadata = {
      ...request.metadata,
      ...result.data,
    };

    next();

    // return result.data;
  };
};
