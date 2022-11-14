const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    Admin.findOne({ username: username, password: password }, (err, admin) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(admin);
        }
    });
})

module.exports = router;