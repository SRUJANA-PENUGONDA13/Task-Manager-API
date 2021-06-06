const mongodb = require('mongodb')
const mongoose = require('mongoose')
const validator = require('validator')

const { Schema } = mongoose

const taskStatus = new Schema({
    taskDescription: 
    {
        type : String,
        required: true,
        lowercase: true,
        trim:true
    },
    status: 
    {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    taskId:
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Task'
    },
    userId: 
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, 
{
    timestamps: true
})
taskStatus.index(
    { userId: 1, taskId: -1 } ,
    { name: "query for inventory", unique: true }
  )
const TaskStatus = mongoose.model('TaskStatus', taskStatus);
module.exports = TaskStatus 

// taskStatus.pre('save', async function (next) 
// {
//     const user = this
//     try
//     {
//         var userId = (user.userId).toString().slice(-5)
//         console.log("User ID: ",userId)
//         var taskId = (user.userId).toString().slice(-5)
//         console.log("task Id:",taskId)
//         taskStatus._id = userId + taskId
//         console.log("ID: ", taskStatus._id)   
//     }
//     catch(e)
//     {
//         console.log("Error Occured")
//         throw new Error(e)
//     }
//     next()
// })