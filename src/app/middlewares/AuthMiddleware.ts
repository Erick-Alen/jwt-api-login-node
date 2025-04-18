import { verify } from 'jsonwebtoken';
import { IData, IMiddleware, IRequest, IResponse } from '../interfaces/IMiddleware';
import { env } from '../config/env';

export class AuthMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse| IData> {
    const { authorization } = headers;
    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Missing Authorization',
        },
      };
    }

    try {
    const [prefixToken, token] = authorization.split(' ');
    if (prefixToken !== 'Bearer' || !token) {
      throw new Error();
    }

      const { sub } = verify(token, env.jwtSecret!)
      return {
        statusCode: 200,
        body: {
          data: {
            user: {
              id: sub,
              name: 'john',
            },
          },
        },
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }
  }
}
