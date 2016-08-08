import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list of books', () => {
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
      return booksController.getAll()
        .then((response) => {
          return expect(response).to.be.eql(expectedResponse);
        });
    });

    it('should throw error', () => {
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
      return booksController.getAll()
        .catch((error) => {
          return expect(error).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Get one book: getById()', () => {
    it('should return one book', () => {
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
      return booksController.getById({id: 1})
        .then((response) => {
          return expect(response).to.be.eql(expectedResponse);
        });
    });

    it('should throw error', () => {
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
      return booksController.getById({})
        .catch((error) => {
          return expect(error).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Create a book: create()', () => {
    it('should create a book', () => {
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
      return booksController.create(requestBody)
        .then((response) => {
          return expect(response).to.be.eql(expectedResponse);
        });
    });

    it('should throw error', () => {
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
      return booksController.create({})
        .catch((error) => {
          return expect(error).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Create a book: update()', () => {
    it('should update an existing book', () => {
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
      return booksController.update(requestBody, {id: 1})
        .then((response) => {
          return expect(response).to.be.eql(expectedResponse);
        });
    });

    it('should throw error', () => {
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
      return booksController.update({}, {})
        .catch((error) => {
          return expect(error).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Delete a book: delete()', () => {
    it('should delete an existing book', () => {
      const Books = {
        destroy: td.function()
      },
      expectedResponse = {};

      td.when(Books.destroy({where: {id: 1}})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.delete({id: 1})
        .then((response) => {
          return expect(response).to.be.eql(expectedResponse);
        });
    });

    it('should throw error', () => {
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
      return booksController.delete({})
        .catch((error) => {
          return expect(error).to.be.eql(expectedResponse);
        });
    });
  });
});
