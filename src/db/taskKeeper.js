const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, 
    { useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

const db = mongoose.connection;
db.on('error', function()
{
    return console.log("Connection Error")
})
db.once('open', function() 
{
  console.log("Connected")
})
