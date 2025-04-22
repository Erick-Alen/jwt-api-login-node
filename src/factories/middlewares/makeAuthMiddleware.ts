import { AuthenticationMiddleware } from '../../app/middlewares/AuthMiddleware';

export const makeAuthMiddleware = () => {
  return new AuthenticationMiddleware();
};
