import React, { useEffect, useState } from 'react';
import { getRecipes, createRecipe } from '../api/recipeApi';
import FilterBar from '../components/FilterBar';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import RecipeModal from '../components/RecipeModal';
import RecipeForm from '../components/RecipeForm';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('Semua');
  const [difficulty, setDifficulty] = useState('Semua');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await getRecipes({
        category,
        difficulty,
        page,
        limit: 6
      });
      setRecipes(data.data);
      setPagination(data.pagination);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Gagal mengambil data resep'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, difficulty, page]);

  const handleFilterChange = (type, value) => {
    if (type === 'category') setCategory(value);
    if (type === 'difficulty') setDifficulty(value);
    setPage(1);
  };

  const handleAddRecipe = async (formData) => {
    const confirmSubmit = window.confirm('Yakin ingin menambahkan resep ini?');
    if (!confirmSubmit) return;

    try {
      await createRecipe(formData);
      setFeedback({
        type: 'success',
        message: 'Resep berhasil ditambahkan'
      });
      setModalOpen(false);
      fetchRecipes();
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.response?.data?.message || 'Gagal menambahkan resep'
      });
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Resep Makanan Nusantara</h1>
        <button className="add-btn" onClick={() => setModalOpen(true)}>
          + Tambah Resep
        </button>
      </header>

      {feedback.message && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <FilterBar
        category={category}
        difficulty={difficulty}
        onFilterChange={handleFilterChange}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="recipe-grid">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} /> 
            ))
          ) : (
            <p>Tidak ada resep ditemukan.</p>
          )}
        </div>
      )}

      <Pagination
        currentPage={pagination.page || 1}
        totalPages={pagination.totalPages || 1}
        onPageChange={setPage}
      />

      <RecipeModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Tambah Resep</h2>
        <RecipeForm onSubmit={handleAddRecipe} />
      </RecipeModal>
    </div>
  );
}

export default Home;