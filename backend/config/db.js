const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('resep_nusantara', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false 
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully');
  } catch (error) {
    console.error('DB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };