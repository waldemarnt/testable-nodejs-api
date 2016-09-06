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
    it('should return a list of books', done => {
      request
      .get('/books')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.body[0].name).to.eql(defaultBook.name);
        expect(res.body[0].id).to.eql(defaultBook.id);
        done(err);
      });
    });
  });

  describe('GET /books/{id}', () => {
    it('should return a book by id', done => {
      request
      .get('/books/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.body.name).to.eql(defaultBook.name);
        expect(res.body.id).to.eql(defaultBook.id);
        done(err);
      });
    });
  });

  describe('POST /books', () => {
    it('should post a book', done => {
      const book = {
        id: 2,
        name: 'Book Created',
      };

      request
      .post('/books')
      .set('Authorization', `JWT ${token}`)
      .send(book)
      .end((err, res) => {
        expect(res.body.name).to.eql(book.name);
        expect(res.body.id).to.eql(book.id);
        done(err);
      });
    });
  });

  describe('PUT /books/{id}', () => {
    it('should update a book', done => {
      const book = {
        id: 1,
        name: 'Book Updated',
      };

      request
      .put('/books/1')
      .set('Authorization', `JWT ${token}`)
      .send(book)
      .end((err, res) => {
        expect(res.body).to.eql([1]);
        done(err);
      });
    });
  });

  describe('DELETE /books/{id}', () => {
    it('should delete a book', done => {
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
