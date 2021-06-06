const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type : String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) 
        {
            if (value.toLowerCase().includes('password')) 
            {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    email:
    {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error('Please provide valid email address')
            }
        }
    },
    contact: 
    {
        type : String,
        validate(value)
        {
            if( value.length != 10 )
                throw new Error('Mobile number is invalid')
        }
    },
    tokens : [{
                token: {
                    type : String,
                    required: true
                }
            }]
})

// This method encrypt the password using bcryptjs module before storing into the database

userSchema.pre('save', async function (next) 
{
    const user = this
    try
    {
        if (user.isModified('password'))
        {
            user.password = await bcrypt.hash(user.password, 8)
        }        
    }
    catch(e)
    {
        throw new Error(e)
    }
    next()
})

// Adding static method to the instance of a collection to generate JWT token

userSchema.methods.generateAuthToken = async function()
{
    try
    {
        const user = this
        const token = jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET)
        user.tokens = user.tokens.concat({ token })
        await user.save()
        return token
    }
    catch(e)
    {
        throw new Error(e)
    }
}

//userSchema.methods.getPublicProfie = async function()
userSchema.methods.toJSON =  function()
{
   const user = this
   const userObj = user.toObject()

   delete userObj.password
   delete userObj.tokens

   return userObj
}

//Adding static method to the schema and retrieving user data by using credentials
userSchema.statics.findByCredentials = async function(email,password)
{
    const user = await User.findOne({ email })
    if(!user)
    {
        throw new Error("Invalid Username")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error("Invalid Password")
    }
    return user
}
const User = mongoose.model('User', userSchema);
module.exports = User 