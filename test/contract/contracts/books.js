import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes: Books', () => {
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Test Book',
  };

  let token;

  beforeEach(done => {
    Users
    .destroy({ where: {} })
    .then(() => Users.create({
      name: 'John',
      email: 'john@gmail.com',
      password: '12345',
    }))
    .then(user => {
      Books
      .destroy({ where: {} })
      .then(() => Books.create(defaultBook))
      .then(() => {
        token = jwt.encode({ id: user.id }, jwtSecret);
        done();
      });
    });
  });

  describe('GET /books', () => {
    it('should validate a list of books', done => {
      request
      .get('/books')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        const booksList = Joi.array().items(Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso(),
        }));

        joiAssert(res.body, booksList);
        done(err);
      });
    });
  });

  describe('GET /books/{id}', () => {
    it('should validate a single book schema', done => {
      request
      .get('/books/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        const booksList = Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso(),
        });

        joiAssert(res.body, booksList);
        done(err);
      });
    });
  });

  describe('POST /books', () => {
    it('should validate a new book schema', done => {
      const book = {
        id: 2,
        name: 'Book Created',
      };

      request
      .post('/books')
      .set('Authorization', `JWT ${token}`)
      .send(book)
      .end((err, res) => {
        const createdBook = Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso(),
        });

        joiAssert(res.body, createdBook);
        done(err);
      });
    });
  });

  describe('PUT /books/{id}', () => {
    it('should validate a updated book', done => {
      const book = {
        id: 1,
        name: 'Book Updated',
      };

      request
      .put('/books/1')
      .set('Authorization', `JWT ${token}`)
      .send(book)
      .end((err, res) => {
        const updatedCount = Joi.array().items(1);

        joiAssert(res.body, updatedCount);
        done(err);
      });
    });
  });

  describe('DELETE /books/{id}', () => {
    it('should validate a deleted book', done => {
      request
      .delete('/books/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.eql(HttpStatus.NO_CONTENT);
        done(err);
      });
    });
  });
});
