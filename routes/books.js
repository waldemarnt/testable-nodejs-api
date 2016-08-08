import BooksController from '../controllers/books';

export default function(app) {
  const booksController = new BooksController(app.datasource.models.Books);
  app.route('/books')
    .get((req, res) => {
      booksController.getAll()
        .then(response => res.json(response))
        .catch(error => res.status(412).json({
          msg: error.message
        }));
    })
    .post((req, res) => {
      booksController.create(req.body)
        .then(response => res.json(response))
        .catch(error => res.status(412).json({
          msg: error.message
        }));
    });

   app.route('/books/:id')
     .get((req, res) => {
       booksController.getById(req.params)
         .then(response => res.json(response))
         .catch(error => res.status(412).json({
           msg: error.message
         }));
     })
   .put((req, res) => {
     booksController.update(req.body, req.params)
       .then(response => res.json(response))
       .catch(error => res.status(412).json({
         msg: error.message
       }));
   })
   .delete((req, res) => {
     booksController.delete(req.params)
       .then(response => res.sendStatus(204))
       .catch(error => res.status(412).json({
         msg: error.message
       }));
   });
};
