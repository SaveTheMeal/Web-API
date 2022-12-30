/**
 * https://www.npmjs.com/package/supertest
 */
const request = require('supertest');
const app     = require('../server');

describe('GET /meal', () => {

  // Moking Meal.find method
  let mealSpy;
  // Moking Meal.findById method
  let mealSpyFindById;

  beforeAll( () => {
    const Meal = require('../models/meal');
    mealSpy = jest.spyOn(Meal, 'find').mockImplementation((criterias) => {
      return [{
        id: 1010,
        title: 'Software Engineering 2'
      }];
    });
    mealSpyFindById = jest.spyOn(Meal, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          id: 1010,
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    mealSpy.mockRestore();
    mealSpyFindById.mockRestore();
  });
  
  test('GET /meal should respond with an array of meals', async () => {
    return request(app)
      .get('../../meal')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(res.body && res.body[0]) {
          expect(res.body[0]).toEqual({
            self: 'meal/1010',
            title: 'Software Engineering 2'
          });
        }
      });
  });

  
  test('GET /meal/:id should respond with json', async () => {
    return request(app)
      .get('../../meal/1010')
      .expect('Content-Type', /json/)
      .expect(200, {
          self: 'meal/1010',
          title: 'Software Engineering 2'
        });
  });

});
