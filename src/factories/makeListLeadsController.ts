import { ListLeadsController } from '../app/controllers/ListLeadsController';

export const makeListLeadsController = () => {
  // const listLeadsUseCase = makeListLeadsUseCase();
  return new ListLeadsController();
  // return null;
};
