import { AuthenticationMiddleware } from '../../app/middlewares/AuthenticationMiddleware';

export const makeAuthenticationMiddleware = () => {
  return new AuthenticationMiddleware();
};
