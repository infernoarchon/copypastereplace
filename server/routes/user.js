const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const Story = require('../database/models/story')

const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password, color, icon } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password,
                color: color,
                icon: icon
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})


router.get("/icon", (req,res) => {
    console.log("getting icon")
    User.findOne({_id: req.user._id}, (err, userInfo) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(userInfo)
    })
})

//Story Routes
router.post('/save', (req, res) => {
    console.log('story save');

    const { title, author, content, base64 } = req.body
    // ADD VALIDATION
    const newStory = new Story({
        title: title,
        author: author,
        content: content,
        base64: base64
    })
    newStory.save((err, savedStory) => {
        if (err) return res.json(err)
        res.json(savedStory)
    })
})

router.get("/latest", (req,res) => {
    console.log("getting story")
    Story.find({}, null, {sort: {date: -1}}, (err, stories) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(stories)
    })
})

// title: { type: String, unique: false, required: false },
// author: { type: String, unique: false, required: false },
// date: { type: Date, default: Date.now },
// views: { type: Number, default:0 },
// content: { type: String, unique: false, required: false },
// base64: { type: String, unique: false, required: false }


module.exports = router