const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const { app, server } = require('../src/server');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('User Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'password123',
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login and return a JWT token', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    const response = await request(app)
      .post('/api/users/login')
      .send({
        username: 'testuser',
        password: 'password123',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    token = response.body.token;
    expect(token).toBeDefined();
  });

  it('should access protected route with valid token', async () => {
    await request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should fail to access protected route without token', async () => {
    await request(app)
      .get('/api/todos')
      .expect(401);
  });

  it('should fail to access protected route with invalid token', async () => {
    await request(app)
      .get('/api/todos')
      .set('Authorization', 'Bearer invalidtoken')
      .expect(400);
  });
});
