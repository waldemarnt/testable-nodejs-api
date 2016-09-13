import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes: Users', () => {
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultUser = {
    id: 1,
    name: 'Test User',
    email: 'test@mail.com',
    password: 'testPassword',
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
      Users.create(defaultUser)
      .then(() => {
        token = jwt.encode({ id: user.id }, jwtSecret);
        done();
      });
    });
  });

  describe('GET /users', () => {
    it('should return a list of users', done => {
      request
      .get('/users')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.body[0].name).to.eql(defaultUser.name);
        expect(res.body[0].id).to.eql(defaultUser.id);
        done(err);
      });
    });
  });

  describe('GET /users/{id}', () => {
    it('should return a user by id', done => {
      request
      .get('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.body.name).to.eql(defaultUser.name);
        expect(res.body.id).to.eql(defaultUser.id);
        done(err);
      });
    });
  });

  describe('POST /users', () => {
    it('should post a user', done => {
      const user = {
        id: 2,
        name: 'User Created',
        email: 'newUser@mail.com',
        password: 'newUserPwd',
      };

      request
      .post('/users')
      .set('Authorization', `JWT ${token}`)
      .send(user)
      .end((err, res) => {
        expect(res.body.name).to.eql(user.name);
        expect(res.body.id).to.eql(user.id);
        done(err);
      });
    });
  });

  describe('PUT /users/{id}', () => {
    it('should update a user', done => {
      const user = {
        id: 1,
        name: 'User Updated',
      };

      request
      .put('/users/1')
      .set('Authorization', `JWT ${token}`)
      .send(user)
      .end((err, res) => {
        expect(res.body).to.eql([1]);
        done(err);
      });
    });
  });

  describe('DELETE /users/{id}', () => {
    it('should delete a user', done => {
      request
      .delete('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.eql(HttpStatus.NO_CONTENT);
        done(err);
      });
    });
  });
});
