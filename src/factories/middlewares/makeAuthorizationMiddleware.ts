import { Role } from '@prisma/client';
import { makeGetRolePermissionsUseCase } from '../makeGetRolePermissionUseCase';
import { AuthorizationMiddleware } from './../../app/middlewares/AuthorizationMiddleware';

export function makeAuthorizationMiddleware(allowedRoles: string[]) {
  return new AuthorizationMiddleware(
    allowedRoles,
    makeGetRolePermissionsUseCase(),
  );
}
