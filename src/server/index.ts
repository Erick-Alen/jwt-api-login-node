import express from 'express';
import { makeListLeadsController } from '../factories/makeListLeadsController';
import { makeAuthMiddleware } from '../factories/middlewares/makeAuthMiddleware';
import { makeSignInController } from '../factories/signin/makeSignInController';
import { makeSignUpController } from '../factories/signup/makeSignUpController';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { routeAdapter } from './adapters/routeAdapter';
import { prismaClient } from '../app/lib/prismaClient';

const app = express();

app.listen(3000, () => {
  // biome-ignore lint/suspicious/noConsoleLog: validate if server is running
  console.log('Server is running on port 3000');
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send(200).json('Hello World!');
});

app.post('/signup', routeAdapter(makeSignUpController()));

app.post('/signin', routeAdapter(makeSignInController()));

app.get(
  '/leads',
  middlewareAdapter(makeAuthMiddleware()),
  routeAdapter(makeListLeadsController()),
);

app.post(
  '/leads',
  middlewareAdapter(makeAuthMiddleware()),
  async (req, res) => {
    const accRole = await prismaClient.account.findUnique({
      where: {
        id: req.metadata.accountId,
      },
      select: {
        role: true,
      }
    });
    console.log('user role:', accRole);

    res.send(200).json('Leads created!')
  }
);
