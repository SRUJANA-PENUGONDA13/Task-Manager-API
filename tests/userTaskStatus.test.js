const supertest = require('supertest')
const { app } = require('../src/app')
const TaskStatus = require('../src/models/userTaskStatus.js')
const { userTaskStatusId, userTaskStatusOne, setupUserTaskStatusData } = require('./fixtures/db')
const { userOne, userThreeId, userThree} = require('./fixtures/db')

beforeEach(setupUserTaskStatusData)

// Should add task status of corresponding user to userTaskStatus collection
test('Should add task status of a specific user', async () => {
    await supertest(app)
        .post('/users/tasks/status')
        .set('Authorization',`Bearer ${userThree.tokens[0].token}`)
        .send(
            {
                "tagName" : "Professional",
                "taskName" : "Teaching",
                "taskDescription" : "Others",
                "taskStatus" : "Inprogress"
            }
        )
        .expect(200)
})

// Should get Unauthenticated message when user not exists
test('Should not add userstatus', async () => {
    await supertest(app)
        .post('/users/tasks/status')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send(
            {
                "tagName" : "Professional",
                "taskName" : "Learning",
                "taskDescription" : "Others",
                "taskStatus" : "Inprogress"
            }
        )
        .expect(401)
})

// Should get all tasks of specific tag of a user
test('Should get all tasks of specific tag of a user', async () => {
    await supertest(app)
        .get('/users/tasks/status/tag/personal')
        .set('Authorization',`Bearer ${userThree.tokens[0].token}`)
        .send()
        .expect(200)
})

// Should get all tasks of specific user created at specific date
test('Should get all users created at specific date', async () => {
    await supertest(app)
        .get('/users/tasks/status/date/09-06-2021')
        .set('Authorization',`Bearer ${userThree.tokens[0].token}`)
        .send()
        .expect(200)
})

// Should get all tasks of specific user
test('Should get all tasks of user', async () => {
    await supertest(app)
        .get('/users/tasks/status')
        .set('Authorization',`Bearer ${userThree.tokens[0].token}`)
        .send()
        .expect(200)
})

// Should not get all tasks of specific user
test('Should get all tasks of user', async () => {
    await supertest(app)
        .get('/users/tasks/status')
        .send()
        .expect(401)
})

// Should not get all tasks of specific user created at specific date
test('Should not get all users created at specific date', async () => {
    await supertest(app)
        .get('/users/tasks/status/date/09-06-2021')
        .send()
        .expect(401)
})


// Should get all tasks of specific tag of a user
test('Should get all tasks of specific tag of a user', async () => {
    await supertest(app)
        .get('/users/tasks/status/tag/professional')
        .send()
        .expect(401)
})

// Should not get all tasks of specific tag of a user when tag is invalid
test('Should not get all tasks of specific tag of a user', async () => {
    await supertest(app)
        .get('/users/tasks/status/tag/xyz')
        .set('Authorization',`Bearer ${userThree.tokens[0].token}`)
        .send()
        .expect(404)
})

// Should not get all tasks of specific user created at specific date when date is invalid
test('Should not get all users created at specific date', async () => {
    await supertest(app)
        .get('/users/tasks/status/date/05-06-2021')
        .set('Authorization',`Bearer ${userThree.tokens[0].token}`)
        .send()
        .expect(404)
})

// Should delete a task of a specific user if task exists
test('Should delete specific task of the user', async () => {
    await supertest(app)
        .delete('/users/tasks/learning')
        .set('Authorization',`Bearer ${userThree.tokens[0].token}`)
        .send()
        .expect(200)
})