const request = require('supertest');
const { app, server } = require('../index');
const User = require('../database/models/user.model');
const { sequelize } = require('../database/connection');

describe('Auth tests', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
    server.close();
  });

  describe('Signup', () => {
    const user = { email: "test@email.com", password: "password" };

    afterEach(async () => {
      await User.destroy({ where: { email: user.email } });
    });

    it('Should return 200 and create a new user', async () => {
      const res = await request(app).post('/auth/signup').send(user);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("User created successfully");
    });

    it('Should return 400 for already existing user', async () => {
      await User.create(user);
      const res = await request(app).post('/auth/signup').send(user);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Email already exists");
    });
  });

  describe('Login', () => {
    const user = { email: "test@email.com", password: "password" };

    beforeEach(async () => {
      await User.create(user);
    });

    afterEach(async () => {
      await User.destroy({ where: { email: user.email } });
    });

    it('Should return 200 for a successful login', async () => {
      const res = await request(app).post('/auth/login').send(user);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Login successful");
    });

    it('Should return 401 for invalid password', async () => {
      const res = await request(app).post('/auth/login').send({ email: user.email, password: "wrongpassword" });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Invalid email or password");
    });
  });
});
