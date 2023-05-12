module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "password",
  DB: "daya-reka-3",
  dialect: "postgres",
  pool: {
    max: 9,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
