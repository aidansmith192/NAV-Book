const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');

let server;
let request;
let agent;
console.log(request);

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  /* eslint no-undef: "error"*/
  request = supertest(server);
  agent = supertest.agent(app);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('post a listing while not authenticated', async () => {
  await agent.post('/v0/listings/vehicles')
    .send({
      category: 'vehicles',
      subcategory: 'motorcycles',
      title: 'test',
      description: 'this is a test',
      price: 1.00,
      longitude: 0.0,
      latitude: 0.0,
      images: ['test'],
    })
    .expect(401);
});

test('get user listings before authenticating', async () => {
  await agent.get('/v0/listings?byUser=true')
    .expect(401);
});

test('get all listings', async () => {
  await agent.get('/v0/listings/')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(10);
    });
});

test('get listings by categories while none exist', async () => {
  await agent.get('/v0/listings?category=doesNotExist')
    .expect(404);
});

test('get listings by categories while none exist2', async () => {
  await agent.get('/v0/listings?subcategory=doesNotExist')
    .expect(404);
});

test('get all listings in a specificAttribute that doesn"t exist', async () => {
  await agent.get('/v0/listings?specificAttribute=doesNotExist')
    .expect(404);
});

test('get all listings matching with a title that does not exist', async () => {
  await agent.get('/v0/listings?title=doesNotExist')
    .expect(404);
});


test('get all listings matching with a title that DOES exist', async () => {
  await agent.get('/v0/listings?title=Honda')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get with a title that does exist', async () => {
  await agent.get('/v0/listings?&title=Ford')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get listings by brand', async () => {
  /* eslint max-len: ["error", { "code": 200 }]*/
  await agent.get('/v0/listings?category=vehicles&subcategory=trucks&brand=ford')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get listings by brand only', async () => {
  await agent.get('/v0/listings?brand=ford')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get listings by title and sort by ASC', async () => {
  await agent.get('/v0/listings?title=Ford&sort=ASC')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get with maxDistance and latitude defined', async () => {
  await agent.get('/v0/listings?maxDistance=5&lat=32.055643')
    .expect(400)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('get listing with maxDistance and longitude defined', async () => {
  await agent.get('/v0/listings?maxDistance=5&long=32.055643')
    .expect(400)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('get listings by title and sort by DESC', async () => {
  await agent.get('/v0/listings?title=Ford&sort=DESC')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get with undefined', async () => {
  /* eslint max-len: ["error", { "code": 300 }]*/
  await agent.get('/v0/listings?category=undefined&subcategory=undefined&title=undefined&specificAttribute=undefined&brand=undefined&sort=undefined&maxDistance=0&lat=0&long=0&byUser=undefined')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(10);
    });
});

test('get all listings matching with minimum price 1000', async () => {
  await agent.get('/v0/listings?minPrice=1000')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(6);
    });
});

test('get all listings with matching title and with minimum price 1000', async () => {
  await agent.get('/v0/listings?title=Ford&minPrice=1000')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});


test('get all listings matching with maximum price 1000', async () => {
  await agent.get('/v0/listings?maxPrice=1000')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(4);
    });
});

test('get all listings matching with minPrice 600 max price 700', async () => {
  await agent.get('/v0/listings?maxPrice=700&minPrice=600')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get all listings matching category vehicles', async () => {
  await agent.get('/v0/listings?category=vehicles')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(6);
    });
});

test('get all listings matching category vehicles2', async () => {
  await agent.get('/v0/listings?category=vehicles&subcategory=trucks')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(2);
    });
});


test('register a user', async () => {
  await agent.post('/v0/auth/register')
    .send({
      email: 'testing@testing.com',
      phoneNumber: '1234567890',
      firstName: 'John',
      lastName: 'Doe',
      password: '1234',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.email).toBeDefined();
      expect(res.body.phoneNumber).toBeDefined();
      expect(res.body.firstName).toBeDefined();
      expect(res.body.lastName).toBeDefined();
    });
});

test('post a listing', async () => {
  await agent.post('/v0/listings/vehicles')
    .send({
      category: 'vehicles',
      subcategory: 'motorcycles',
      userId: '8d73d001-6899-439a-a4b5-27dd4f3fff37',
      title: 'test',
      description: 'this is a test',
      price: 1.00,
      longitude: 0.0,
      latitude: 0.0,
      images: ['test'],
    })
    .expect(200);
});

test('get lisings byuser and by title after authenticating', async () => {
  await agent.get('/v0/listings?title=test&byUser=true')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get lisings byuser and by maxPrice after authenticating', async () => {
  await agent.get('/v0/listings?maxPrice=50000&byUser=true')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get lisings byuserafter authenticating', async () => {
  await agent.get('/v0/listings?byUser=true')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

// // used for further testing, does not do anything differently than previous test
test('post a listing into a category that does not exist', async () => {
  await agent.post('/v0/listings/doesnotexist')
    .send({
      subcategory: 'motorcycles',
      title: 'test',
      description: 'this is a test',
      price: 1.00,
      longitude: 0.0,
      latitude: 0.0,
      images: ['test'],
    })
    .expect(400);
});

test('get listings by title and category', async () => {
  await agent.get('/v0/listings?title=Honda&category=vehicles')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get listings by max distance away', async () => {
  /* eslint max-len: ["error", { "code": 300 }]*/
  await agent.get('/v0/listings?category=undefined&subcategory=undefined&title=undefined&specificAttribute=undefined&brand=undefined&sort=undefined&maxDistance=5&lat=37.686503&long=-122.474633&byUser=undefined')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get listings by title and specificAttribute', async () => {
  await agent.get('/v0/listings?title=Honda&specificAttribute=new')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});


test('get listings by max distance away and category', async () => {
  /* eslint max-len: ["error", { "code": 300 }]*/
  await agent.get('/v0/listings?maxDistance=5&lat=37.686503&long=-122.474633&category=vehicles')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
    });
});

test('get listings by max distance away without lat or long set', async () => {
  /* eslint max-len: ["error", { "code": 300 }]*/
  await agent.get('/v0/listings?category=undefined&subcategory=undefined&title=undefined&specificAttribute=undefined&brand=undefined&sort=undefined&maxDistance=5&lat=undefined&long=undefined&byUser=undefined')
    .expect(400);
});

test('post a listing to a subcategory', async () => {
  await agent.post('/v0/listings/vehicles?subcategory=motorcycles')
    .send({
      category: 'vehicles',
      subcategory: 'motorcycles',
      userId: '8d73d001-6899-439a-a4b5-27dd4f3fff37',
      title: 'test',
      description: 'this is a test',
      price: 1.00,
      longitude: 0.0,
      latitude: 0.0,
      images: ['test'],
    })
    .expect(200);
});

// test('post a listing to a category that does not exist', async () => {
//     await agent.post('/v0/listings/doesNotExist')
//         .send({
//             category: "vehicles",
//             subcategory: "motorcycles",
//             userId: '8d73d001-6899-439a-a4b5-27dd4f3fff37',
//             title: "test",
//             description: "this is a test",
//             price: 1.00,
//             longitude: 0.0,
//             latitude: 0.0,
//             images: ['test'],
//         })
//         .expect(400);
// });

test('post a listing to a subcategory that does not exist', async () => {
  await agent.post('/v0/listings/vehicles?subcategory=doesNotExist')
    .send({
      category: 'vehicles',
      subcategory: 'motorcycles',
      userId: '8d73d001-6899-439a-a4b5-27dd4f3fff37',
      title: 'test',
      description: 'this is a test',
      price: 1.00,
      longitude: 0.0,
      latitude: 0.0,
      images: ['test'],
    })
    .expect(400);
});

// test('get all listings', async () => {
//   await agent.get('/v0/listings/')
//   .expect(200)
//       .then((res) => {
//           expect(res).toBeDefined();
//           expect(res.body).toBeDefined();
//           expect(res.body.length).toBe(3)
//       });
// });

// test('get all listings of a category', async () => {
//     await agent.get('/v0/listings/vehicles')
//         .expect(200)
//         .then((res) => {
//             expect(res).toBeDefined();
//             expect(res.body).toBeDefined();
//             expect(res.body.length).toBe(2)
//         });
// });

// test('get all listings of a category', async () => {
//     await agent.get('/v0/listings/vehicles?subcategory=motorcycles')
//         .expect(200)
//         .then((res) => {
//             expect(res).toBeDefined();
//             expect(res.body).toBeDefined();
//             expect(res.body.length).toBe(1)
//         });
// });

// test('get all listings', async () => {
//     await agent.get('/v0/listings?byUser=true')
//         .expect(200)
//         .then((res) => {
//             expect(res).toBeDefined();
//             expect(res.body).toBeDefined();
//             expect(res.body.length).toBe(3)
//         });
// });
