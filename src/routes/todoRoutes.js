// src/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const { verifyToken } = require('../middleware/auth');

// Apply the verifyToken middleware to all routes
router.use(verifyToken);

router.get('/', async (req, res) => {
  try {
    const todos = await getTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving todos' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ message: 'All fields are required: title, description, and status.' });
  }

  try {
    const newTodo = await createTodo(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

router.put('/:id', async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ message: 'All fields are required: title, description, and status.' });
  }

  try {
    const updatedTodo = await updateTodo(req.params.id, req.body);
    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request, invalid ID' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteTodo(req.params.id);
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request, invalid ID' });
  }
});

module.exports = router;
