module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password%123",
    DB: "sequilize",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };