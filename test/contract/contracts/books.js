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
    it('should validate a list of books', done => {

      request
        .get('/books')
        .end((err, res) => {
          const booksList = Joi.array().items(Joi.object().keys({
            id: Joi.number(),
            name: Joi.string(),
            created_at: Joi.date().iso(),
            updated_at: Joi.date().iso()
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
        .end((err, res) => {
          const booksList = Joi.object().keys({
            id: Joi.number(),
            name: Joi.string(),
            created_at: Joi.date().iso(),
            updated_at: Joi.date().iso()
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
        name: "Book Created"
      };

      request
        .post('/books')
        .send(book)
        .end((err, res) => {
          const createdBook = Joi.object().keys({
            id: Joi.number(),
            name: Joi.string(),
            created_at: Joi.date().iso(),
            updated_at: Joi.date().iso()
          });

          joiAssert(res.body, createdBook);
          done(err);
        });
    });
  });

  describe('PUT /books/{id}', () => {
    it('should validate a update book', done => {
      const book = {
        id: 1,
        name: "Book Updated"
      };

      request
        .put('/books/1')
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
        .end((err, res) => {
          expect(res.statusCode).to.eql(204);
          done(err);
        });
    });
  });
});
