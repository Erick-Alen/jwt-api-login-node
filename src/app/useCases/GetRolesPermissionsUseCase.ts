import { InvalidCredentials } from '../errors/InvalidCredentials';
import { prismaClient } from '../lib/prismaClient';
interface IInput {
  roleId: string;
}

interface IOutput {
  permissionCodes: string[];
}

export class GetRolePermissionsUseCase {
  async execute({ roleId }: IInput): Promise<IOutput> {
    const rolePermissions = await prismaClient.rolePermission.findMany({
      where: {
        roleId,
      },
      select: {
        permissionCode: true,
      },
    });

    if (!rolePermissions) {
      throw new InvalidCredentials();
    }

    const permissionCodes = rolePermissions.map(
      (permission) => permission.permissionCode,
    );

    return {
      permissionCodes,
    };
  }
}
