require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require("./models/user")

const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const reportRoutes = require('./routes/report.routes');
const intermediateRoutes = require('./routes/intermediate.routes');

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    res.status(200).send('Logged in');
});

app.use('/user', userRoutes);
app.use('/admin', adminRoutes)
app.use('/report', reportRoutes)
app.use('/intermediate', intermediateRoutes)

mongoose.connect(
    process.env.DB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(err) console.log(err) 
        else {
            User.init()
            console.log('Connected to DB');
            app.listen(port, () => console.log(`Example app listening on port ${port}!`));
        }
})

