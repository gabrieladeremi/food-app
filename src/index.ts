import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';
import AuthController from './resources/auth/auth.controller';

validateEnv();

const app = new App([new AuthController], Number(process.env.PORT));

app.listen();