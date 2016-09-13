import bodyParser from 'body-parser';
import express from 'express';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import datasource from './config/datasource';
import config from './config/config';
import authorization from './auth';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 3000);

const auth = authorization(app);

app.use(bodyParser.json());
app.use(auth.initialize());

app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;
