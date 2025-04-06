export interface IRequest {
  body: Record<string, any>;
  params?: any;
  query?: any;
  headers?: any;
}
export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
  headers?: any;
  message?: string;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
