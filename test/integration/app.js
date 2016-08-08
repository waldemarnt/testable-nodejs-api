import HttpStatus from 'http-status';

describe('Routes: Books', () => {
  const Books = app.datasource.models.Books,
  defaultBook = {
    id: 1,
    name: 'Test Book'
  };

  beforeEach(done => {
    Books
      .destroy({where:{}})
      .then(() => Books.create(defaultBook))
      .then(() => {
        done();
      });
  });

  describe('GET /books', () => {
    it('should return a list of books', done => {

      request
        .get('/books')
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
        name: "Book Created"
      };

      request
        .post('/books')
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
        name: "Book Updated"
      };

      request
        .put('/books/1')
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
        .end((err, res) => {
          expect(res.statusCode).to.eql(HttpStatus.NO_CONTENT);
          done(err);
        });
    });
  });
});
