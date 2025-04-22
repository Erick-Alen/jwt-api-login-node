import { Role } from '@prisma/client';
import { AuthorizationMiddleware } from './../../app/middlewares/AuthorizationMiddleware';

export function makeAuthorizationMiddleware(allowedRoles: Role[]) {
  return new AuthorizationMiddleware(allowedRoles);
}
