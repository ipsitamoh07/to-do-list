const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');

describe('Todo API', () => {
  let savedTodo;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should create a new todo', async () => {
    const newTodo = { title: 'Test Todo', description: 'Test Description', status: 'pending' };
    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .expect('Content-Type', /json/)
      .expect(201);

    savedTodo = response.body;

    expect(response.body).toHaveProperty('title', newTodo.title);
    expect(response.body).toHaveProperty('description', newTodo.description);
    expect(response.body).toHaveProperty('status', newTodo.status);
  });

  test('should get all todos', async () => {
    const response = await request(app)
      .get('/api/todos')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('should get a todo by ID', async () => {
    const response = await request(app)
      .get(`/api/todos/${savedTodo._id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('title', savedTodo.title);
    expect(response.body).toHaveProperty('description', savedTodo.description);
    expect(response.body).toHaveProperty('status', savedTodo.status);
  });

  test('should update a todo by ID', async () => {
    const updatedTodo = { title: 'Updated Todo', description: 'Updated Description', status: 'completed' };
    const response = await request(app)
      .put(`/api/todos/${savedTodo._id}`)
      .send(updatedTodo)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('title', updatedTodo.title);
    expect(response.body).toHaveProperty('description', updatedTodo.description);
    expect(response.body).toHaveProperty('status', updatedTodo.status);
  });

  test('should delete a todo by ID', async () => {
    await request(app)
      .delete(`/api/todos/${savedTodo._id}`)
      .expect(204);
  });
});
