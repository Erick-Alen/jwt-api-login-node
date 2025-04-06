import { Request, Response } from 'express';
import { IController } from '../../app/interfaces/IController';

// currying function
// to adapt the controller to the route
export const routeAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const { statusCode, body } = await controller.handle({
      body: req.body,
    });
    res.status(statusCode).json(body);
  };
};
