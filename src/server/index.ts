import express from 'express';
import { makeListLeadsController } from '../factories/makeListLeadsController';
import { makeAuthenticationMiddleware } from '../factories/middlewares/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '../factories/middlewares/makeAuthorizationMiddleware';
import { makeSignInController } from '../factories/signin/makeSignInController';
import { makeSignUpController } from '../factories/signup/makeSignUpController';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { routeAdapter } from './adapters/routeAdapter';

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
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['leads:read'])),
  routeAdapter(makeListLeadsController()),
);

app.post(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['leads:write'])),
  // async (req, res) => {
  //   res.send(200).json('Leads created!');
  // }
);
