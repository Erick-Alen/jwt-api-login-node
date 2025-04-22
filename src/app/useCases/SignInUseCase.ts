import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '../config/env';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { prismaClient } from '../lib/prismaClient';
interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}

export class SignInUseCase {
  async execute({email, password} : IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: {
        email
      }
    })

    if (!account) {
      throw new InvalidCredentials();
    }

    const passwordMatch = await compare(password, account.password);

    if (!passwordMatch) {
      throw new InvalidCredentials();
    }

    const accessToken = sign({user: account.name, role: account.role}, env.jwtSecret!, {
      subject: account.id,
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    return {
      accessToken
    };
  }
}
