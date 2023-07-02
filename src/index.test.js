const request = require('supertest');
const { app, server } = require('./index');
const { sequelize } = require('./database/connection');

describe('Server is running', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
    server.close();
  });

  it('Should return 200 with "Server ok"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Server ok");
  });

  it('Should return 404 with "Route not found"', async () => {
    const res = await request(app).get('/randomRoute');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("Route not found");
  });
});
