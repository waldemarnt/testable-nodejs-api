class BooksController {
  constructor(Books) {
    this.Books = Books;
  }

  getAll() {
    return this.Books.findAll({})
      .then(result => result);
  }

  getById(params) {
    return this.Books.findOne({
      where: params,
    })
    .then(result => result);
  }

  create(data) {
    return this.Books.create(data)
      .then(result => result);
  }

  update(data, params) {
    return this.Books.update(data, {
      where: params,
    })
      .then(result => result);
  }

  delete(params) {
    return this.Books.destroy({
      where: params,
    })
    .then(result => result);
  }
}

export default BooksController;
