import { JwtPayload, verify } from 'jsonwebtoken';
import { env } from '../config/env';
import { IData, IMiddleware, IResponse } from '../interfaces/IMiddleware';
import { IRequest } from '../interfaces/IRequest';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const authorization = headers?.authorization;
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

      const payload = verify(token, env.jwtSecret!) as JwtPayload;
      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role,
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
