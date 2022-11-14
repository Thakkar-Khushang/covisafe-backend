const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/profile', (req, res) => {
    const {email} = req.body;
    User.findOne({email: email}, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(user);
        }
    });
})

router.post('/adduser', async (req, res) => {
    const { facedata, name, email } = req.body;
    const user = new User({
        facedata,
        name,
        email,
    });
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;