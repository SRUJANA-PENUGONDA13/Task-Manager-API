const mongoose = require('mongoose')
const { Schema } = mongoose

const tagSchema = new Schema({
    name: {
        type : String,
        unique: true,
        required: true,
        lowercase: true,
        trim:true
    }
})

// virtual fields creates a virtual connection to the ref table
tagSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'tagId'
})

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag
