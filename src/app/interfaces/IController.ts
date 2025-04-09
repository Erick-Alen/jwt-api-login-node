
export interface IRequest {
  body: Record<string, any>;
  params: Record<string, any>;
  accountId: string | undefined;
  query?: any;
  headers?: Record<string, string>;
}
export interface IResponse {
  statusCode: 200 | number;
  body: Record<string, any> | null;
  headers?: Record<string, string>;
  message?: string;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
