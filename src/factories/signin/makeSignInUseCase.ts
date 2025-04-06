import { SignInUseCase } from '../../app/useCases/SignInUseCase';

export const makeSignInUseCase = () => {
  return new SignInUseCase();
};
