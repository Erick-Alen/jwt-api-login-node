import { IController } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { IResponse } from './../interfaces/IController';

export class ListLeadsController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    console.log(request);
    return {
      statusCode: 200,
      body: {
        leads: [
          { id: '1', name: 'john' },
          { id: '2', name: 'marie' },
          { id: '3', name: 'james' },
        ],
      },
    };
  }
}
