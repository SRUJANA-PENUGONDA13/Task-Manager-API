const supertest = require('supertest')
const { app } = require('../src/app')
const { userOneId, userOne, setupUserData} = require('./fixtures/db')

jest.mock('../src/mail/mail')
const { welcomeMail } = require('../src/mail/mail')

beforeEach(setupUserData)

test('Should signup a new user', async () => {
    await supertest(app).post('/users').send({
        "name" : "Srujana Penugonda",
        "password" : "Sweety@13",
        "email" : "srujanapenugonda1318@outlook.com",
        "contact" : "9052679841"  
    }).expect(200)
})

test('Should login if user exists', async () => {
    await supertest(app).post('/user/login').send(
        {
            "email" : "penugondasrujana3@gmail.com",
            "password" : "Sweety@13"
        }
    ).expect(200)
})
test('Should not signup if user already exists', async () => {
    
    await supertest(app).post('/users').send({
        "name" : "Srujana Penugonda",
        "password" : "Sweety@13",
        "email" : "srujanapenugonda13@outlook.com",
        "contact" : "9052679841"  
    }).expect(400)
})
test('Should get all users profiles', async () => {
    await supertest(app)
        .get('/users')
        .send()
        .expect(200)
})
test('Should delete user', async () => {
    await supertest(app)
        .delete('/user')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})
test('Should not delete user', async () => {
    await supertest(app)
        .delete('/user')
        .send()
        .expect(401)
})
test('Should logout the user from current session', async () => {
    await supertest(app)
        .post('/user/logout')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})
test('Should not logout the user from current session', async () => {
    await supertest(app)
        .post('/user/logout')
        .send()
        .expect(401)
})
test('Should logout the user from all active session', async () => {
    await supertest(app)
        .post('/users/logoutAll')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})
test('Should not logout the user from all active session', async () => {
    await supertest(app)
        .post('/users/logoutAll')
        .send()
        .expect(401)
})
