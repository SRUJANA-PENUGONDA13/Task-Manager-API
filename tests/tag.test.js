const supertest = require('supertest')
const { app } = require('../src/app')
const Tag = require('../src/models/tags.js')
const { tagOne, tagOneId, setupTagData} = require('./fixtures/db')

beforeEach(setupTagData)

// Test case - 1 It checks tag data is inserted or not
test('Should add a tag', async () => {
    response = await supertest(app).post('/tag').send({
        tagName: "Learning"
    }).expect(200)
    const tag = await Tag.findById(response.body._id)
    expect(tag).not.toBeNull()
})

// Test case-2 Duplicate data validation
test('Should not add a tag', async () => {
    await supertest(app).post('/tag').send({
        tagName: "office"
    }).expect(400)
})

// Test case-3 To verify all tag details are retrived or not
test('Should retrieve all tags', async () => {
    response = await supertest(app).get('/tags').send().expect(200)
})

// Test case-4 It should return 404 not found if we provide a tag that is not exists in collection
test('Should not delete specific tag', async () => {
    response = await supertest(app).delete('/tag/learning').send().expect(404)
})

// Test case-4 It should delete specific tag
test('Should not delete specific tag', async () => {
    response = await supertest(app).delete('/tag/personal').send().expect(200)
})


