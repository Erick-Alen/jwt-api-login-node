import { AuthMiddleware } from '../../app/middlewares/AuthMiddleware';

export const makeAuthMiddleware = () => {
  return new AuthMiddleware();
};
