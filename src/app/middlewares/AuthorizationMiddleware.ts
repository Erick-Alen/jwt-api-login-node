import { IData, IMiddleware, IResponse } from '../interfaces/IMiddleware';
import { IRequest } from '../interfaces/IRequest';
import { GetRolePermissionsUseCase } from '../useCases/GetRolesPermissionsUseCase';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getRolePermissionUseCase: GetRolePermissionsUseCase,
  ) {}

  async handle({ account }: IRequest): Promise<IResponse | IData> {
    if (!account) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied.',
        },
      };
    }

    const { permissionCodes } = await this.getRolePermissionUseCase.execute({
      roleId: account.role,
    });

    const isAllowed = this.requiredPermissions.some((permission) =>
      permissionCodes.includes(permission),
    );

    if (!isAllowed) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied.',
        },
      };
    }

    return {
      data: {},
    };
  }
}
