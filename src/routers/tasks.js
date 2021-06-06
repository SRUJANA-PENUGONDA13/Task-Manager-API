const express = require('express')
const taskRouter = new express.Router

// Adding schema
const Task = require('../models/task')
const Tag = require('../models/tags')

// This router adds a task to the Task Collection
taskRouter.post('/tasks', async (req,res)=>
{
    const tag = await Tag.findOne({ name: req.body.tagName })
    try
    {
        if(!tag)
            throw new Error('Tag does not exist please add tag before adding tasks')
        await insertTasks(req,tag._id).then((data) =>
        {
            res.send({data,'TagName' : tag.name})
        }).catch((error) => 
        {
            res.status(400).send(error)
        })
    }
    catch(e)
    {
        res.status(400).send(e.toString())
    }
})

// This router retrieve all tasks from Task Collection
taskRouter.get('/tasks', async (req,res)=>
{
    try
    {
        const task = await Task.find({})
        res.send({task})
    }
    catch(e)
    {
        res.status(400).send(e.toString())
    }
})

// This router retrieves all tasks of a specific tag from Task Collection
taskRouter.get('/tasks/:tagName', async (req,res)=>
{
    const tag = await Tag.findOne({ name: req.params.tagName })
    try
    {
        if(!tag)
            throw new Error('Tag does not exist please provide valid tag')
        const task = await Task.find({ tagId : tag._id })
        res.send({task})
    }
    catch(e)
    {
        res.status(404).send(e.toString())
    }
})

async function insertTasks(req,tagId)
{
    const task = new Task({
        name : req.body.taskName,
        tagId
    })
    data = await task.save()
    return data
    
}

module.exports = {
                    taskRouter,
                    insertTasks
                 }