export default {
  database: 'library',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: process.env.TEST ? 'test_library.sqlite' : 'library.sqlite',
    define: {
      underscored: true,
    },
  },
};
