import React, { useState } from 'react';

function RecipeForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Makanan Berat',
    difficulty: 'Mudah',
    description: '',
    ingredients: [''],
    steps: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDynamicChange = (index, field, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({
      ...prev,
      [field]: updated
    }));
  };

  const addField = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validIngredients = form.ingredients.filter((item) => item.trim() !== '');
    const validSteps = form.steps.filter((item) => item.trim() !== '');

    if (validIngredients.length < 1 || validSteps.length < 1) {
      alert('Minimal harus ada 1 bahan dan 1 langkah.');
      return;
    }

    onSubmit({
      ...form,
      ingredients: validIngredients,
      steps: validSteps
    });
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <input
        type="text"
        name="name"
        placeholder="Nama Resep"
        value={form.name}
        onChange={handleChange}
        required
      />
      
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="Makanan Berat">Makanan Berat</option>
        <option value="Kue">Kue</option>
        <option value="Minuman">Minuman</option>
        <option value="Sambal">Sambal</option>
        <option value="Camilan">Camilan</option>
      </select>

      <select name="difficulty" value={form.difficulty} onChange={handleChange}>
        <option value="Mudah">Mudah</option>
        <option value="Sedang">Sedang</option>
        <option value="Sulit">Sulit</option>
      </select>

      <textarea
        name="description"
        placeholder="Deskripsi Resep"
        value={form.description}
        onChange={handleChange}
        required
      />

      <h4>Bahan</h4>
      {form.ingredients.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Bahan ${index + 1}`}
          value={ingredient}
          onChange={(e) => handleDynamicChange(index, 'ingredients', e.target.value)}
        />
      ))}
      <button type="button" onClick={() => addField('ingredients')}>
        + Tambah Bahan
      </button>

      <h4>Langkah</h4>
      {form.steps.map((step, index) => (
        <textarea
          key={index}
          placeholder={`Langkah ${index + 1}`}
          value={step}
          onChange={(e) => handleDynamicChange(index, 'steps', e.target.value)}
        />
      ))}
      <button type="button" onClick={() => addField('steps')}>
        + Tambah Langkah
      </button>

      <button type="submit">Simpan Resep</button>
    </form>
  );
}

export default RecipeForm;