import React, { useState } from 'react';
import RecipeAccordion from './RecipeAccordion';

function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false);

  let safeIngredients = [];
  let safeSteps = [];

  try {
    safeIngredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : JSON.parse(recipe.ingredients || '[]');

    safeSteps = Array.isArray(recipe.steps)
      ? recipe.steps
      : JSON.parse(recipe.steps || '[]');
  } catch {
    safeIngredients = [];
    safeSteps = [];
  }

  return (
    <>
      {/* CARD BIASA */}
      <div className="recipe-card" onClick={() => setOpen(true)}>
        <h3>{recipe.name}</h3>
        <p><strong>Kategori:</strong> {recipe.category}</p>
        <p><strong>Tingkat:</strong> {recipe.difficulty}</p>
        <p>{recipe.description}</p>
      </div>

      {/* MODAL */}
      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setOpen(false)}>X</button>

            <h2>{recipe.name}</h2>
            <p><strong>Kategori:</strong> {recipe.category}</p>
            <p><strong>Tingkat:</strong> {recipe.difficulty}</p>
            <p>{recipe.description}</p>

            <div>
              <strong>Bahan:</strong>
              <ul>
                {safeIngredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <RecipeAccordion steps={safeSteps} />
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeCard;