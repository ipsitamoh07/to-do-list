const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const { verifyToken } = require('../middleware/auth');
const Todo = require('../models/Todo');

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated unique ID of the todo item
 *         title:
 *           type: string
 *           description: Title of the todo item
 *         description:
 *           type: string
 *           description: Detailed description of the todo item
 *         status:
 *           type: string
 *           enum: [pending, ongoing, completed]
 *           description: Status of the todo item
 *       example:
 *         id: d5fE_asz
 *         title: Buy groceries
 *         description: Need to buy milk and eggs
 *         status: pending
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API endpoints for managing todos
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve a list of all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', async (req, res) => {
  try {
    const todos = await getTodos(req.user.id); // Pass the userId to the getTodos function
    return res.status(200).json(todos);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    return res.status(500).json({ message: 'Error retrieving todos' });
  }
});

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request, missing required fields
 */
router.post('/', async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    console.log('Validation error: Missing fields');
    return res.status(400).json({ message: 'All fields are required: title, description, and status.' });
  }

  const todoData = {
    title,
    description,
    status,
    userId: req.user.id // Add the userId from the verified token
  };

  try {
    console.log('Request body:', req.body);
    const newTodo = await createTodo(req.body);
    console.log('New todo created:', newTodo);
    return res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    return res.status(500).json({ message: 'Error creating todo' });
  }
});


/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       400:
 *         description: Bad request, invalid ID
 */
router.put('/:id', async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ message: 'All fields are required: title, description, and status.' });
  }

  const todoData = { title, description, status };

  try {
    console.log(`Updating todo with ID: ${req.params.id} for user: ${req.user.id}`);
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Ensure the Todo belongs to the user
      todoData,
      { new: true }
    );

    if (updatedTodo) {
      return res.status(200).json(updatedTodo);
    } else {
      return res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    return res.status(400).json({ message: 'Bad request, invalid ID' });
  }
});

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the todo to delete
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       400:
 *         description: Bad request, invalid ID
 */

router.delete('/:id', async (req, res) => {
  try {
    console.log(`Deleting todo with ID: ${req.params.id} for user: ${req.user.id}`);
    const result = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); // Ensure the Todo belongs to the user
    if (result) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(400).json({ message: 'Bad request, invalid ID' });
  }
});

module.exports = router;
