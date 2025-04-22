import { IRequest } from './IRequest';

export interface IResponse {
  statusCode: 200 | number;
  body: Record<string, any> | null;
  headers?: Record<string, string>;
  message?: string;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
