const Todo = require('../models/Todo');

// Fetch todos for a specific user
const getTodos = async (userId) => {
  return await Todo.find({ userId });
};

// Create a new todo for a specific user
const createTodo = async (data) => {
  const newTodo = new Todo({
    title: data.title,
    description: data.description,
    status: data.status,
    userId: data.userId,
  });
  return await newTodo.save();
};

// Update a todo for a specific user
const updateTodo = async (id, data, userId) => {
  return await Todo.findOneAndUpdate(
    { _id: id, userId }, // Ensure the todo belongs to the user
    data,
    { new: true }
  );
};

// Delete a todo for a specific user
const deleteTodo = async (id, userId) => {
  return await Todo.deleteOne({ _id: id, userId }); // Ensure the todo belongs to the user
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
