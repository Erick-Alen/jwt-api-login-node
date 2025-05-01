import { GetRolePermissionsUseCase } from '../app/useCases/GetRolesPermissionsUseCase';

export const makeGetRolePermissionsUseCase = () => {
  // const getRolePermissionsUseCase = new GetRolePermissionsUseCase();
  return new GetRolePermissionsUseCase();
};
