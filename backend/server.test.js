/**
 * https://www.npmjs.com/package/supertest
 */
const request = require('supertest');
const app     = require('./app');

test('app module should be defined', async () => {
  expect(app).toBeDefined();
});

test('GET / should return 200', async () => {
  return request(app)
    .get('/')
    .expect(200);
});
