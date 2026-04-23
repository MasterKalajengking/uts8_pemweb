const validateRecipe = (req, res, next) => {
  const { name, category, difficulty, description, ingredients, steps } = req.body;
  
  if (!name || !category || !difficulty || !description) {
    return res.status(400).json({
      success: false,
      message: 'Semua field utama wajib diisi.'
    });
  }
  
  if (!Array.isArray(ingredients) || ingredients.length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Minimal harus ada 1 bahan.'
    });
  }
  
  if (!Array.isArray(steps) || steps.length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Minimal harus ada 1 langkah.'
    });
  }
  
  const cleanIngredients = ingredients.filter(item => item.trim() !== '');
  const cleanSteps = steps.filter(item => item.trim() !== '');
  
  if (cleanIngredients.length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Bahan tidak boleh kosong semua.'
    });
  }
  if (cleanSteps.length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Langkah tidak boleh kosong semua.'
    });
  }
  
  req.body.ingredients = cleanIngredients;
  req.body.steps = cleanSteps;
  next();
};

module.exports = validateRecipe;