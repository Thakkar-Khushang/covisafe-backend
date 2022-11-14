require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require("./models/user")

const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    res.status(200).send('Hello World!');
});

app.use('/user', userRoutes);

mongoose.connect(
    process.env.MONGO_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        User
        console.log('Connected to DB');
        app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})

