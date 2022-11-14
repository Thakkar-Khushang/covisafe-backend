const router = require('express').Router();
const User = require('../models/user');
// const Report = require('../models/report');
// const Actuation = require('../models/actuation');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

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