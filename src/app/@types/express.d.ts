import { Role } from '@prisma/client';
declare namespace Express {
  interface Request {
    metadata?: {
      account?: {
        id: string;
        role: Role[];
      };
    };
  }
}
