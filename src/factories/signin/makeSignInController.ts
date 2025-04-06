import { SignInController } from '../../app/controllers/SignInController';
import { makeSignInUseCase } from './makeSignInUseCase';

export const makeSignInController = () => {
  const signUpUseCase = makeSignInUseCase();
  return new SignInController(signUpUseCase);
};
