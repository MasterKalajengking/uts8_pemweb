const Recipe = require('../models/recipeModel');
const { Op } = require('sequelize');

const getRecipes = async (req, res) => {
  try {
    const { category, difficulty, page = 1, limit = 6 } = req.query;
    
    // Build query filter
    const whereCondition = {};
    if (category && category !== 'Semua') {
      whereCondition.category = category;
    }
    if (difficulty && difficulty !== 'Semua') {
      whereCondition.difficulty = difficulty;
    }

    const currentPage = parseInt(page);
    const perPage = parseInt(limit);
    const offset = (currentPage - 1) * perPage;

    // findAndCountAll mengembalikan total data (count) dan datanya (rows)
    const { count, rows } = await Recipe.findAndCountAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: perPage
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: currentPage,
        limit: perPage,
        totalPages: Math.ceil(count / perPage)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data resep',
      error: error.message
    });
  }
};

const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Resep berhasil ditambahkan',
      data: newRecipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan resep',
      error: error.message
    });
  }
};

module.exports = {
  getRecipes,
  createRecipe
};