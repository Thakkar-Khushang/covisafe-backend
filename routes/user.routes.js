const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/profile', (req, res) => {
    const { email } = req.query;
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(user);
        }
    });
})

router.post('/adduser', async (req, res) => {
    const { name, email } = req.body;
    console.log(name, email);
    try {
        const user = await User.findOne({ email: email })
        console.log(user)
        if (user) return res.status(400).send('User already exists');
        else {
            const newUser = new User({
                name,
                email,
            });

            const savedUser = await newUser.save();
            res.status(200).send(savedUser);

        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

//get user name by id
router.get('/getname', (req, res) => {
    const { id } = req.query;
    User.findOne({
        _id: id
    }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log(user)
            res.status(200).send(user);
        }
    });
})

module.exports = router;