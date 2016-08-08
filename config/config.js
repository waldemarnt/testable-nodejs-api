export default {
  database: process.env.DATABASE || 'library',
  username:'',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: process.env.DATABASE ? process.env.DATABASE + '_library.sqlite' : 'library.sqlite',
    define: {
      underscored: true
    }
  }
};
