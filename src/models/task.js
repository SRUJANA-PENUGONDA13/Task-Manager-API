const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
    name: {
        type : String,
        required: true,
        lowercase: true,
        unique: true,
        trim:true
    },
    tagId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Tag'
    }
    
})

//userSchema.methods.getPublicProfie = async function()
taskSchema.methods.toJSON =  function()
{
   const task = this
   const taskObj = task.toObject()
   delete taskObj.tagId
   delete taskObj.__v
   return taskObj
}

const Task = mongoose.model('Task', taskSchema);
module.exports = Task 