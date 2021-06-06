const express = require('express')
const tagRouter = new express.Router

// Adding schema
const Tag = require('../models/tags')

// This router adds a tag to the Tag Collection
tagRouter.post('/tag', async (req,res)=>
{
    await insertTags(req).then((data) =>
    {
        res.status(200).send(data)
    }).catch((error) => 
    {
        res.status(400).send(error)
    })
})

// This router retrieves all tag from Tag Collection
tagRouter.get('/tags', async (req,res)=>
{
    const tag = await Tag.find({})
    try
    {
        res.send({tag})
    }
    catch(e)
    {
        console.log("Error Occured",e)
        res.status(400).send(e.toString())
    }
})

// This router deletes a specific tag from Tag Collection
tagRouter.delete('/tag/:tagName', async (req,res)=>
{
    const tag = await Tag.deleteOne({ name: req.params.tagName })
    if(tag.deletedCount == 0)
    {
        res.status(404).send("Tag Not Found")
    }
    else
    {
        res.status(200).send("Tag Deleted Successfully")
    }

})
insertTags = async (req) =>
{
    const tag = Tag( { name : req.body.tagName })
    data = await tag.save()
    return data
    
}
module.exports = { tagRouter,
                   insertTags
                }