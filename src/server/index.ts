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
app.post('/signup', async (req, res) => {
  const signUpController = makeSignUpController();
  const { statusCode, body } = await signUpController.handle({
    body: req.body,
  });
  res.status(statusCode).json(body);
});

app.post('/signin', async (req, res) => {
  const signInController = makeSignInController();
  const { body, statusCode } = await signInController.handle({
    body: req.body,
  });
  res.status(statusCode).json(body);
});
