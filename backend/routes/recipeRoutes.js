const express = require('express');
const router = express.Router();
const { getRecipes, createRecipe } = require('../controllers/recipeController');
const validateRecipe = require('../middlewares/validateRecipe');

router.get('/resepUMKM', getRecipes);
router.post('/resepUMKM', validateRecipe, createRecipe);

module.exports = router;