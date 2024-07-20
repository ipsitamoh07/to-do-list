const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const setupSwagger = require('./swagger');
const { verifyToken } = require('./middleware/auth'); 
const authorizeRole = require('./middleware/authorizeRole');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log(`MongoDB URI: ${MONGO_URI}`);
console.log(`Port: ${PORT}`);

app.use(express.json());

setupSwagger(app);

// Routes
app.use('/api/users', userRoutes); // Add user routes
app.use('/api/todos', verifyToken, authorizeRole(['user', 'admin']), todoRoutes); // Secure todo routes

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export app, server
module.exports = { app, server };
