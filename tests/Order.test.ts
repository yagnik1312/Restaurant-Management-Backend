import {Order} from '../src/models/Order';
import {logger} from '../src/utils/logger';
import {config} from '../config/configFile';
// const app = require('../src/app')
import {app} from '../src/app';
//const MONGODBTEST_URL = config.getMongoDbTESTurl()
//const DBName = config.getDatabaseName()
import { userOne } from './fixtures/db';  
import request from 'supertest';

describe('API test', () => {
  //jest.setTimeout(20000)

  let id=''

  describe('Should Remove database and collection data', () => {
    test('Remove database and collection', () => {
      // beforeEach( async() => {
      //   awaitOrder.remove()
      //   // await MONGODBTEST_URL.close();
      //   // await DBName.dropDatabase()
      //     .then((info: any) => {
      //       console.log(info);
      //     })
      //     .catch((err: any) => {
      //       console.log(err);
      //     });
      // });
    })

  })

// POST api test
describe('Post API', () => {
  test("should create Order", async () => {
    const res = await request(app)
      .post("/Orders")
      .set("Authorization", `Bearer ${userOne.token}`)
      .send({   
        OrderId:123,    
        UserID:123,    
        Amount:123,    
        FoodItems:'Test',  
      });
    expect(200);
    id=res.body.data.OrderData._id
    //console.log(res.statusCode, '<----status code ')
    // console.log(res, '<---response for post api ')

  });

  test('If ID is not there', async () => {
    const response = await request(app)
      .post("/Orders")
      .set("Authorization", `Bearer ${userOne.token}`)
      .send({ 
        FoodItems:'Test',
      });
    expect(400)
    // console.log(response.statusCode, '<----status Code')
  })


  test('If Name is not there', async () => {
    const response = await request(app)
      .post("/Orders")
      .set("Authorization", `Bearer ${userOne.token}`)
      .send({ 
        OrderId:123,
        UserID:123,
        Amount:123,
      });
    expect(400)
  })

  // test('ID already exist', async () => {
    //   const res = await request(app)
    //     .post("/Orders")
    //     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    //     .send({
    //       Id: 14,
    //       name: "EmployeeName"
    //     })
    //     // .expect({ Id: 13 })
    //     .expect(400)
    //     // .then((result: any) => {
    //     //   expect(result.data.length === 1)
    //     //   console.log(result, '<-----result ID already exist')
    //     // })
    //   // console.log(res, '<----res for the ID is already exist')
    //   console.log(res.statusCode, '<---res status code ')
    // })

    
    // POST api is not Exist 
    test('POST api not Exist', async () => {
      const res = await request(app)
        .post("/OrdernotExist")
        .set("Authorization", `Bearer ${userOne.token}`)
        .send({ 
          OrderId:123,
          UserID:123,
          Amount:123,
          FoodItems:'Test',
        });
      expect(400);
    })

  })

  
  //  for GET api test
  describe('GET api', () => {
    test('should GET employee info with status code 200', async () => {
      const res = await request(app)
        .get('/Orders')
        .set("Authorization", `Bearer ${userOne.token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((result: any) => {
          expect(result)
          // console.log(result, '<----result')
        }).catch((error: any) => {
          console.log(error, '<----error in GET API')
        })
    })

    
    //  If GET api is not Exist 
    test('GET api not exist', async () => {
      const res = await request(app)
        .get('/OrdersnotExist')
        .set("Authorization", `Bearer ${userOne.token}`)
        .expect(400)
        .then((result: any) => {
          expect(result)
        })
    })
  })

  //  get by Id 
  describe('GET api by id', () => {
    test("should GET employee info with particular user id", async () => {
      const res = request(app)
        .get(`/Orders/${id}`)
        .set("Authorization", `Bearer ${userOne.token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        //.then((response: any) => {
         // expect(response).toBe(200);
      // console.log(res, '<--- getting response for getting by id ')
    });


    //  If ID is wrong 
    test("should Fail info with particular user id", async () => {
      const res = request(app)
        .get(`/Orders/${id}212`)
        .set("Authorization", `Bearer ${userOne.token}`)
      expect(400)
      // console.log(res, '<--- getting response for getting by id ')
      // console.log(res.statusCode, '<--- status code')
    });
    
      
    //  if GET by id api is not Exist
    test('GET by ID api not exist', () => {
      const res = request(app)
        .get(`/OrdersnotExist/${id}`)
        .set("Authorization", `Bearer ${userOne.token}`)
      expect(400)
    })
  })


  // for update 
  describe('UPDATE api', () => {
    test('Should update ', async () => {
      const res = await request(app)
        .patch(`/Orders/${id}`)
        .send({  
          OrderId:123, 
          UserID:123, 
          Amount:123, 
          FoodItems:'Test',
        })
        .set("Authorization", `Bearer ${userOne.token}`)
        .expect(200)
      // console.log(res, '<----response')
      // console.log(res.statusCode, '<--- status code')
    })


    //  // If ID is not there 
    test('ID is not there in UPDATE', async () => {
      const response = await request(app)
        .patch(`/Orders/${id}`)
        .set("Authorization", `Bearer ${userOne.token}`)
        .send({ 
          FoodItems:'Test',
        });
      expect(404)
      //     console.log(response.statusCode, '<----status Code')
    })


    // If name is not there
    test('Name is not provided in UPDATE', async () => {
      const response = await request(app)
        .patch(`/Orders/${id}`)
        .set("Authorization", `Bearer ${userOne.token}`)
        .send({ 
          OrderId:1,
          UserID:1,
          Amount:1,
        });
      expect(404)
      //     console.log(response.statusCode, '<----status Code')
    })


    // If ID is wrong
    test('ID is wrong', async () => {
      const response = await request(app)
        .patch(`/Orders/${id}222`)
        .set("Authorization", `Bearer ${userOne.token}`)
        .send({ 
          OrderId:123,
          UserID:123,
          Amount:123,
          FoodItems:'Test',
        });
      expect(response.statusCode).toBe(400)
      //     console.log(response.statusCode, '<----status Code')
    })


    // if API is wrong 
    test('API is wrong', async () => {
      const res = await request(app)
        .patch(`/OrdersnotExist/${id}`)
        .set("Authorization", `Bearer ${userOne.token}`)
        .send({ 
          OrderId:123,
          UserID:123,
          Amount:123,
          FoodItems:'Test',
        });
      expect(400);
    })
  })

  
  // for delete 
  describe('DELETE api ', () => {
    test("should delete", async () => {
      const res = await request(app)
        .delete(`/Orders/${id}`)
        .set("Authorization", `Bearer ${userOne.token}`)
      expect(200);
    });


    
    // If id is wrong 
    test('If Id is wrong', async () => {
      const res = await request(app)
        .delete(`/Orders/${id}122`)
        .set("Authorization", `Bearer ${userOne.token}`)
      expect(404)
    })

    // If Delete api is not exist 
    test('DELETE api not exist', async () => {
      const res = await request(app)
        .delete(`/OrdersNotExist/${id}`)
        .expect(400)
      // console.log(res, '<-----res')

    })
  })

})





