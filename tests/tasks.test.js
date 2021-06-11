const supertest = require('supertest')
const { app } = require('../src/app')
const Task = require('../src/models/task.js')
const { taskOne, taskOneId, setupTaskData } = require('./fixtures/db')

beforeEach(setupTaskData)

// Test case - 1 It should not add a task if tag already exists
test('Should not add a task', async () => {
    response = await supertest(app).post('/tasks').send({
        "taskName" : "Reading",
        "tagName" : "office"
    }).expect(400)
})

// Test case - 2 It should add a task
test('Should add a task', async () => {
    response = await supertest(app).post('/tasks').send({
        "taskName" : "Programming",
        "tagName" : "office"
    }).expect(200)
    const task = await Task.findById(response.body.data._id)
    expect(task).not.toBeNull()
})

// Test case - 3 It should retrieve all tasks of specific tag
test('Should retrieve all tasks of specific tag', async () => {
    response = await supertest(app).get('/tasks/office').send().expect(200)
})

// Test case - 4 It should not retrieve all tasks of given tag
test('Should not retrieve all tasks of given tag', async () => {
    response = await supertest(app).get('/tasks/ksdfkj').send().expect(404)
    
})

// Test case - 5 It should not retrieve all tasks 
test('Should retrieve all tasks ', async () => {
    response = await supertest(app).get('/tasks/').send().expect(200)
    
})






