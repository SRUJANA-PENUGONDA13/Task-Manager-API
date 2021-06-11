const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Tag = require('../../src/models/tags.js')
const Task = require('../../src/models/task.js')
const TaskStatus = require('../../src/models/userTaskStatus.js')

const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()
const userThreeId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'Srujana',
    email: 'penugondasrujana3@gmail.com',
    password: 'Sweety@13',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}
const userTwo = {
    _id: userTwoId,
    "name" : "Srujana Penugonda",
    "password" : "Sweety@13",
    "email" : "srujanapenugonda13@outlook.com",
    "contact" : "9052679841"
}
const userThree = {
    _id: userThreeId,
    name: 'Srujana',
    email: 'srujanapenugonda13@gmail.com',
    password: 'Sweety@13',
    tokens: [{
        token: jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET)
    }]
}
// Tag test Data
const tagOneId = new mongoose.Types.ObjectId("60c076d7654a6322988c9c9e")
const tagOne = {
    _id: tagOneId,
    name : "office"
}
// Tag test Data
const tagTwoId = new mongoose.Types.ObjectId("60c0eecf6ef6725658e08c10")
const tagTwo = {
    _id: tagTwoId,
    name : "personal"
}

// Task Test Data
const taskOneId = new mongoose.Types.ObjectId()
const taskOne = {
    _id : taskOneId,
    name : "Reading",
    tagId : tagOneId
}
// Task Test Data
const taskTwoId = new mongoose.Types.ObjectId()
const taskTwo = {
    _id : taskTwoId,
    name : "Learning",
    tagId : tagTwoId
}

// UserTaskStatus Test Data
const userTaskStatusId = new mongoose.Types.ObjectId() 
const userTaskStatusOne = {
    "userId" : userThreeId,
    "taskId" : taskOneId,
    "tagName" : "personal",
    "taskName" : "Reading",
    "taskDescription" : "Others",
    "status" : "Inprogress"
}

// UserTaskStatus Test Data
const userTaskStatusIdTwo = new mongoose.Types.ObjectId() 
const userTaskStatusTwo = {
    "userId" : userThreeId,
    "taskId" : taskTwoId,
    "tagName" : "personal",
    "taskName" : "Learning",
    "taskDescription" : "Others",
    "status" : "Inprogress"
}

const setupUserData = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}
const setupTagData = async() =>
{
    await Tag.deleteMany()
    await new Tag(tagOne).save()
    await new Tag(tagTwo).save()
}
const setupTaskData = async() =>
{
    await Task.deleteMany()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
}
const setupUserTaskStatusData = async() =>
{
    setupTagData()
    setupTaskData()
    await User.deleteMany()
    await new User(userThree).save()
    await TaskStatus.deleteMany()
    await new TaskStatus(userTaskStatusOne).save()  
    await new TaskStatus(userTaskStatusTwo).save()
    
}
module.exports = {
    userOneId,
    userOne,
    userTwo,
    userThreeId,
    userThree,
    tagOneId,
    tagOne,
    taskOneId,
    taskOne,
    userTaskStatusId,
    userTaskStatusOne,
    userTaskStatusIdTwo,
    userTaskStatusTwo,
    setupUserData,
    setupTagData,
    setupTaskData,
    setupUserTaskStatusData
}