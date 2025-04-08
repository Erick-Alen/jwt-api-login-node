import { IMiddleware, IRequest, IResponse } from '../interfaces/IMiddleware';

export class AuthMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse> {
    const { authorization } = headers;
    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Unauthorized',
        },
      };
    }
    const token = authorization.split(' ')[1];
    if (token !== 'valid_token') {
      return {
        statusCode: 401,
        body: {
          error: 'Unauthorized',
        },
      };
    }
    return {
      statusCode: 200,
      body: {
        data: {
          user: {
            id: '1',
            name: 'john',
          },
        },
      },
    };
  }
}
