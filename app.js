import bodyParser from 'body-parser';
import express from 'express';
import booksRouter from './routes/books';
import datasource from './config/datasource';
import config from './config/config';
import BooksController from './controllers/books';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 3000);
app.use(bodyParser.json());
booksRouter(app);

export default app;
