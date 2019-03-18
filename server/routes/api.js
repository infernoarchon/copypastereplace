const express = require('express')
const router = express.Router()
const Story = require('../database/models/story')

router.post('/save', (req, res) => {
    console.log('story save');

    const { title, author, content, base64, color, icon } = req.body
    // ADD VALIDATION
    const newStory = new Story({
        title: title,
        author: author,
        content: content,
        base64: base64,
        color: color,
        icon: icon
    })
    newStory.save((err, savedStory) => {
        if (err) return res.json(err)
        res.json(savedStory)
    })
})

router.get("/latest", (req,res) => {
    console.log("getting latest")
    Story.find({}, null, {sort: {date: -1}}, (err, stories) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(stories)
    })
})

router.get("/popular", (req,res) => {
    console.log("getting popular")
    Story.find({}, null, {sort: {views: -1}}, (err, stories) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(stories)
    })
})

router.post('/view', (req, res) => {
    console.log('user viewed story');
    const storyId = Object.keys(req.body)[0]
    Story.findOneAndUpdate({ _id: storyId }, { $inc: { views: 1 } }, {new: true }, (err, response) => {
        if (err) return res.json(err)
        res.json(response)
}) 
    // ADD VALIDATION
    // Story.findOne({_id: req.user._id}, (err, userInfo) => {
    //     if (err) return res.status(500).send(err)
    //     return res.status(200).send(userInfo)
    // })
    // newStory.save((err, savedStory) => {
    //     if (err) return res.json(err)
    //     res.json(savedStory)
    // })
})

router.get("/story/:id", (req,res) => {
    console.log("getting story")
    console.log(req.params.id)
    Story.findOne({_id: req.params.id }, (err, story) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(story)
    })
})

// title: { type: String, unique: false, required: false },
// author: { type: String, unique: false, required: false },
// date: { type: Date, default: Date.now },
// views: { type: Number, default:0 },
// content: { type: String, unique: false, required: false },
// base64: { type: String, unique: false, required: false }


module.exports = router