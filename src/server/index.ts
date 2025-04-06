import express from 'express';
import { makeSignUpController } from '../factories/signup/makeSignUpController';
import { routeAdapter } from './adapters/routeAdapter';
import { makeSignInController } from '../factories/signin/makeSignInController';

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
