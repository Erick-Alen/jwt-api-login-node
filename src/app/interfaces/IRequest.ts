import { Role } from '@prisma/client';

export interface IRequest {
  body: Record<string, any>;
  params: Record<string, any>;
  headers: Record<string, string>;
  query?: any;
  account?: {
    id: string;
    role: Role;
  };
}
