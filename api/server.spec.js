const request = require('supertest');
const server = require('./server.js');

describe('/games', () => {
  describe('GET /', () => {
    it('should return status code 200', async () => {
      const res = await request(server).get('/games');

      expect(res.status).toBe(200);
    });
  });
});