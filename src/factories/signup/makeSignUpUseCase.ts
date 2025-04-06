import { SignUpUseCase } from '../../app/useCases/SignUpUseCase';

export const makeSignUpUseCase = () => {
  const SALTS = 10;
  return new SignUpUseCase(SALTS);
};
