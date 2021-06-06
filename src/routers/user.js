const express = require('express')
const userRouter = new express.Router

// Adding schema
const User = require('../models/user')
const TaskStatus = require('../models/userTaskStatus')

// Adding Middlewares
const auth = require('../middleware/auth')

// Adding mail module
const { welcomeMail } = require('../mail/mail.js')

// This router adds a user to the User Collection
userRouter.post('/users', async (req,res)=>
{
    const me = User(req.body)
    try
    {
        const token = await me.generateAuthToken()
        await me.save()
        welcomeMail(me.name,me.email)
        res.send({me,token})
    }
    catch(e)
    {

        res.status(400).send(e.toString())
    }
})

// This router retrieves all users from User Collection
userRouter.get('/users', auth, async (req,res)=>
{
    const users = await User.find({})
    try
    {
        res.send(users)
    }
    catch(e)
    {
        res.status(404).send(e)
    }
})

// This router validates user credentials,generates JWT token and adds to User Collection
userRouter.post('/user/login', async (req,res)=>
{
    try
    {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user ,token})
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

// This router logout the user from the current session
userRouter.post('/user/logout',auth, async (req,res)=>
{
    try 
    {
        req.user.tokens = req.user.tokens.filter((token) => 
        {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } 
    catch (e) 
    {
        res.status(500).send()
    }
})

// This router logout the user from the active sessions
userRouter.post('/users/logoutAll', auth, async (req, res) => 
{
    try 
    {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } 
    catch (e) 
    {
        res.status(500).send()
    }
})
// This router deletes user and corresponidng task details from User and TaskStatus collections
userRouter.delete('/user', auth, async (req,res)=>
{
    const taskStatus = await TaskStatus.deleteMany({ userId : req.user._id })
    const user = await User.deleteOne({ _id : req.user._id })

    res.status(200).send("User Deleted Successfully")
   
})
module.exports = userRouter
