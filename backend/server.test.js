/**
 * https://www.npmjs.com/package/supertest
 */
const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const app     = require('./server');

test('app module should be defined', async () => {
  expect(app).toBeDefined();
});

test('GET / should return 200', async () => {
  return request(app)
    .get('/')
    .expect(200);
});
