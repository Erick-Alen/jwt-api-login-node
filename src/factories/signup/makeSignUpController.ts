import { SignUpController } from '../../app/controllers/SignUpController';
import { makeSignUpUseCase } from './makeSignUpUseCase';

export const makeSignUpController = () => {
  const signUpUseCase = makeSignUpUseCase();
  return new SignUpController(signUpUseCase);
};
