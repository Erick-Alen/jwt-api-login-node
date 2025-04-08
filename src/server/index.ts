import express from 'express';
import { makeListLeadsController } from '../factories/makeListLeadsController';
import { makeSignInController } from '../factories/signin/makeSignInController';
import { makeSignUpController } from '../factories/signup/makeSignUpController';
import { routeAdapter } from './adapters/routeAdapter';
import { makeAuthMiddleware } from '../factories/middlewares/makeAuthMiddleware';
import { middlewareAdapter } from './adapters/middlewareAdapter';

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
  (request, response, next) => {
    // middleware to check if user is authenticated
    if (!request.headers.authorization) {
      return response.sendStatus(401);
    }

    next();
  },
  middlewareAdapter(makeAuthMiddleware()),
  routeAdapter(makeListLeadsController()),
);
