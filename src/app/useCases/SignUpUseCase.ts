import { hash } from 'bcryptjs';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { prismaClient } from '../lib/prismaClient';

interface IInput {
  name: string;
  email: string;
  password: string;
}
interface IOutput {
  name: string;
  email: string;
  hashedPassword: string;
}

// adding dependency injection

export class SignUpUseCase {
  constructor(private readonly salt: number) {}
  async execute({ email, name, password }: IInput): Promise<IOutput> {
    const emailAlreadyExists = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });
    if (emailAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, this.salt);

    await prismaClient.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return {
      email,
      name,
      hashedPassword,
    };
  }
}
