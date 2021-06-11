// Loading in-built modules
const express = require('express')

// Database connection
require('./db/taskKeeper')

// Loading user defined modules
const userRouter = require('./routers/user.js')
const { tagRouter } = require('./routers/tags.js')
const { taskRouter } = require('./routers/tasks.js')
const taskStatusRouter = require('./routers/userTaskStatus.js')

const app = express()

//Adding routers to app
app.use(express.json())
app.use(userRouter)
app.use(tagRouter)
app.use(taskRouter)
app.use(taskStatusRouter)

app.get('',(req,res)=>
{
    const msg = { "Instructions" : {"message": "Please follow below swagger documentation to know more about Task Manager API","Swagger URL":"https://srujana-task-manager-api-docs.herokuapp.com/swagger/"}}
    res.send(msg)
   
})

module.exports = { app }