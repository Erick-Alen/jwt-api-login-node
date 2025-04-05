import { hash } from 'bcryptjs';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { prismaClient } from '../lib/prismaClient';

interface IInput {
  name: string;
  email: string;
  password: string;
}

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface IOutput {
  // Define the output type if needed
}

export class SignUpUseCase {
  async execute({email, name, password} : IInput): Promise<IOutput> {
    const emailAlreadyExists = await prismaClient.account.findUnique({
      where: {
        email
      }
    })
    if (emailAlreadyExists) {
      throw new AccountAlreadyExists();
    }
    await prismaClient.account.create({
      data: {
        email,
        name,
        password,
      }
    })

    const hashedPassword = hash(password, 10);

    return {
        email,
        name,
        hashedPassword,
      } as IOutput;
  }
}
