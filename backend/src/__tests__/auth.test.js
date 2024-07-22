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
  request = supertest(server);
  agent = supertest.agent(app);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('get session with no session', async () => {
  await agent.get('/v0/auth/session')
    .expect(401);
});

test('login with bad info', async () => {
  await agent.post('/v0/auth/login')
    .send({email: 'doesnotexist@asdf.asdf',
      password: '1234'})
    .expect(401);
});

test('logout with bad info', async () => {
  await agent.post('/v0/auth/login')
    .send({
      email: 'doesnotexist@asdf.asdf',
      password: '1234',
    })
    .expect(401);
});

test('register with bad info', async () => {
  await agent.post('/v0/auth/login')
    .send({
      bad: 'doesnotexasdfasdfsdf.asdf',
      badinfo: '123asdfa4',
      wrong: 'sdfa',
    })
    .expect(400);
});

// THIS SHOULD AUTHORIZE THE USER
test('register with good info', async () => {
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

test('GET session', async () => {
  await agent.get('/v0/auth/session')
    .expect(200);
});

test('logout', async () => {
  await agent.post('/v0/auth/logout')
    .expect(200);
});

test('logout while loggedout', async () => {
  await agent.post('/v0/auth/logout')
    .expect(401);
});

// THIS SHOULD AUTHORIZE THE USER
test('register with already used phone number', async () => {
  await agent.post('/v0/auth/register')
    .send({
      email: 'anothertest@anothertest.com',
      phoneNumber: '1234567890',
      firstName: 'jhon',
      lastName: 'Dee',
      password: '12334',
    })
    .expect(409);
});

test('register with already used email', async () => {
  await agent.post('/v0/auth/register')
    .send({
      email: 'testing@testing.com',
      phoneNumber: '123456789000',
      firstName: 'jhon',
      lastName: 'Dee',
      password: '12334',
    })
    .expect(409);
});

test('login OK w/ phoneNumber', async () => {
  await agent.post('/v0/auth/login')
    .send({
      phoneNumber: '1234567890',
      password: '1234',
    })
    .expect(200);
});

test('logout2', async () => {
  await agent.post('/v0/auth/logout')
    .expect(200);
});

test('login OK w/ email', async () => {
  await agent.post('/v0/auth/login')
    .send({
      email: 'testing@testing.com',
      password: '1234',
    })
    .expect(200);
});

test('logout3', async () => {
  await agent.post('/v0/auth/logout')
    .expect(200);
});


test('BAD password', async () => {
  await agent.post('/v0/auth/login')
    .send({
      email: 'testing@testing.com',
      password: '12345',
    })
    .expect(401);
});

test('register with phone number too long', async () => {
  await agent.post('/v0/auth/register')
    .send({
      email: 'testing@testing.com',
      phoneNumber: '000000000000000000000000000000000',
      firstName: 'John',
      lastName: 'Doe',
      password: '1234',
    })
    .expect(500);
});
