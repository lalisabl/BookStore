// config.js
module.exports = {
  env: {
    PORT:5000,
    dbUrl:'mongodb+srv://tokumadoncare:e-bookstore-psd@cluster0.zrczxmr.mongodb.net/bookstoreBD?retryWrites=true&w=majority',
    NODE_ENV:'development',
    SECRET_KEY:'simple-secrete-key',
    TOKEN_EXPIRES_IN:50000,
    JWT_COOKIE_EXPIRES_IN:90
  },
};
