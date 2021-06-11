const express = require('express')
const taskStatusRouter = new express.Router

// Adding schema
const Task = require('../models/task')
const Tag = require('../models/tags')
const User = require('../models/user')
const TaskStatus = require('../models/userTaskStatus')

// Adding Middlewares
const auth = require('../middleware/auth')

// Adding Routers
const { insertTags } = require('./tags.js')
const { insertTasks } = require('./tasks.js')

// This method extract date from timestamp
extractDate = (timeStamp)=>
{
    const day = ("0"+ (timeStamp.getDate())).slice(-2)
    const month = ("0"+ (timeStamp.getMonth() + 1 )).slice(-2)
    return ""+day +"-"+month+"-"+ timeStamp.getFullYear()
}
// This router inserts task details of a specific user into TaskStatus collection
taskStatusRouter.post('/users/tasks/status', auth, async (req,res)=>
{
    var tag = await Tag.findOne({ name: req.body.tagName })
    try
    {
        if(!tag)
        {
            await insertTags(req).then(async (data) =>
            {
                tag = data
                         
            }).catch((error) => 
            {
                throw new Error(error)
            })
        }
        var task = await Task.findOne({ name: req.body.taskName })
        if(!task)
        {
            await insertTasks(req,tag._id).then((data) =>
            {
                task = data
            }).catch((error) => 
            {
                throw new Error(error)
            })   
        }
        const taskStatus = new TaskStatus({
            taskId : task._id,
            status: req.body.taskStatus,
            taskDescription : req.body.taskDescription,
            userId: req.user._id   
        })
        await taskStatus.save()
        res.send(req.body)
    }
    catch(e)
    {
        res.status(400).send(e.toString())
    }
       
})
// This router retrieves task details of user on specific date from TaskStatus Collection
taskStatusRouter.get('/users/tasks/status/date/:date', auth, async (req,res)=>
{
    
    var taskStatus = await TaskStatus.find({ userId : req.user._id })
    try
    {
        if(taskStatus.count == 0)
        {
            throw new Error("Data not found") 
        }
        else
        {
            var tasks =  taskStatus.filter((task) =>
            { 
                dateString = extractDate(task.createdAt)
                if( dateString.trim() == req.params.date.trim())
                    return task    
            })
            if (tasks.length == 0)
                throw new Error("Data not found")
            else
                res.send(tasks)     
        }    
    }
    catch(e)
    {
        res.status(404).send()
    }
})
// This router retrieves task details of user on specific tag from TaskStatus Collection
taskStatusRouter.get('/users/tasks/status/tag/:tagName', auth, async (req,res)=>
{
    var tag = await Tag.findOne({ name: req.params.tagName })
    var taskStatus = []
    try
    {
        if(tag)
        {
            await tag.populate('tasks').execPopulate()
            tasks = tag.tasks.filter((task) => task._id)
            taskStatus = await TaskStatus.find( { taskId: {$in: tasks},
                                                    userId : req.user._id
                                            })
        }
        else
            throw new Error("Tag not found")
        if(taskStatus.length > 0)
        {
            res.send(taskStatus)  
        }
        else
        {
            throw new Error("Task not found")
        }
    }
    catch(e)
    {
        res.status(404).send("No Data Found")
    }  
})
// This router retrieves task details of user on specific task from TaskStatus Collection
taskStatusRouter.delete('/users/tasks/:taskName', auth, async (req,res)=>
{
    const task = await Task.findOne({ name: req.params.taskName })
    try
    {
        if(!task)
            throw new Error("Data not found")
        const taskStatus = await TaskStatus.deleteMany({ taskId : task._id, userId : req.user._id })
        if(taskStatus.deletedCount == 0)
        {
            throw new Error("Data not found")
        }
        else
        {
            res.status(200).send("Tasks Deleted Successfully")
        }
    }
    catch(e)
    {
        res.status(404).send()
    }
    
        
})
// This router retrieves all tasks details of user from TaskStatus Collection
taskStatusRouter.get('/users/tasks/status', auth, async (req,res)=>
{
    const taskStatus = await TaskStatus.find({ userId :  req.user._id })
    if(taskStatus.length == 0)
        res.status(404).send()
    else
        res.send(taskStatus)
        
})


module.exports = taskStatusRouter