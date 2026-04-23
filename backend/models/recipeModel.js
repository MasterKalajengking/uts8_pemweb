const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Recipe = sequelize.define('Recipe', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('Makanan Berat', 'Kue', 'Minuman', 'Sambal', 'Camilan'),
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('Mudah', 'Sedang', 'Sulit'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.JSON,
    allowNull: false
  },
  steps: {
    type: DataTypes.JSON, 
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'recipes'
});

module.exports = Recipe;