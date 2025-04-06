import { ZodError, z } from 'zod';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import type {
  IController,
  IRequest,
  IResponse,
} from '../interfaces/IController';
import type { SignInUseCase } from '../useCases/SignInUseCase';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password is required' }),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);
      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      });
      return {
        statusCode: 200,
        body: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            message: 'Invalid credentials',
          },
        };
      }

      throw error;
    }
  }
}
