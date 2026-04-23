const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = 5000;

// Connect to MySQL
connectDB();

// Sync Models with Database (akan membuat tabel jika belum ada)
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

app.use(cors());
app.use(express.json());

app.use('/api', recipeRoutes);

app.get('/', (req, res) => {
  res.send('API Resep Nusantara aktif (MySQL)');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});