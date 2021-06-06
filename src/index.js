// Loading in-built modules
const express = require('express')

// Loading user defined modules
const userRouter = require('./routers/user.js')
const { tagRouter } = require('./routers/tags.js')
const { taskRouter } = require('./routers/tasks.js')
const taskStatusRouter = require('./routers/userTaskStatus.js')

// Database connection
require('./db/taskKeeper')

const app = express()
const port = process.env.PORT

//Adding routers to app
app.use(express.json())
app.use(userRouter)
app.use(tagRouter)
app.use(taskRouter)
app.use(taskStatusRouter)

app.listen(port,()=>
{
  console.log("Server started")
})