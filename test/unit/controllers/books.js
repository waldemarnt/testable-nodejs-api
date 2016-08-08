import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list of books', done => {
      const Books = {
        findAll: td.function()
      },
      expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z'
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.getAll()
        .then((response) => {
          expect(response).to.be.eql(expectedResponse);
          done();
        });
    });

    it('should throw error', done => {
      const Books = {
        findAll: td.function()
      },
      expectedResponse = {
        error: {
          message: 'Error'
        }
      };

      td.when(Books.findAll({})).thenReject(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.getAll()
        .catch((error) => {
          expect(error).to.be.eql(expectedResponse);
          done();
        });
    });
  });

  describe('Get one book: getById()', () => {
    it('should return one book', done => {
      const Books = {
        findOne: td.function()
      },
      expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z'
      }];


      td.when(Books.findOne({where:{id: 1}})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.getById({id: 1})
        .then((response) => {
          expect(response).to.be.eql(expectedResponse);
          done();
        });
    });

    it('should throw error', done => {
      const Books = {
        findOne: td.function()
      },
      expectedResponse = {
        error: {
          message: 'Error'
        }
      };

      td.when(Books.findOne({where:{}})).thenReject(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.getById({})
        .catch((error) => {
          expect(error).to.be.eql(expectedResponse);
          done();
        });
    });
  });

  describe('Create a book: create()', () => {
    it('should create a book', done => {
      const Books = {
        create: td.function()
      },
      requestBody = {
        name: 'Test Book'
      },
      expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-06T23:55:36.692Z'
      }];

      td.when(Books.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.create(requestBody)
        .then((response) => {
          expect(response).to.be.eql(expectedResponse);
          done();
        });
    });

    it('should throw error', done => {
      const Books = {
        create: td.function()
      },
      expectedResponse = {
        error: {
          message: 'Error'
        }
      };

      td.when(Books.create({})).thenReject(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.create({})
        .catch((error) => {
          expect(error).to.be.eql(expectedResponse);
          done();
        });
    });
  });

  describe('Create a book: update()', () => {
    it('should update an existing book', done => {
      const Books = {
        update: td.function()
      },
      requestBody = {
        id: 1,
        name: 'Test Book Updated'
      },
      expectedResponse = [{
        id: 1,
        name: 'Test Book Updated',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-10T23:55:36.692Z'
      }];

      td.when(Books.update(requestBody, {where: {id: 1}})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.update(requestBody, {id: 1})
        .then((response) => {
          expect(response).to.be.eql(expectedResponse);
          done();
        });
    });

    it('should throw error', done => {
      const Books = {
        update: td.function()
      },
      expectedResponse = {
        error: {
          message: 'Error'
        }
      };

      td.when(Books.update({}, {where: {}})).thenReject(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.update({}, {})
        .catch((error) => {
          expect(error).to.be.eql(expectedResponse);
          done();
        });
    });
  });

  describe('Delete a book: delete()', () => {
    it('should delete an existing book', done => {
      const Books = {
        destroy: td.function()
      },
      expectedResponse = {};

      td.when(Books.destroy({where: {id: 1}})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.delete({id: 1})
        .then((response) => {
          expect(response).to.be.eql(expectedResponse);
          done();
        });
    });

    it('should throw error', done => {
      const Books = {
        destroy: td.function()
      },
      expectedResponse = {
        error: {
          message: 'Error'
        }
      };

      td.when(Books.destroy({where: {}})).thenReject(expectedResponse);

      const booksController = new BooksController(Books);
      booksController.delete({})
        .catch((error) => {
          expect(error).to.be.eql(expectedResponse);
          done();
        });
    });
  });
});
