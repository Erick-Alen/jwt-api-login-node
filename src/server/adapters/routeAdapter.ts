import { Request, Response } from 'express';
import { IController } from '../../app/interfaces/IController';

// currying function
// to adapt the controller to the route
export const routeAdapter = (controller: IController) => {
  return async (request: Request, res: Response) => {
    const { statusCode, body } = await controller.handle({
      body: request.body,
      params: request.params,
      account: request.metadata?.account,
      headers: request.headers as Record<string, string>,
    });
    res.status(statusCode).json(body);
  };
};
