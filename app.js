require("dotenv").config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    res.status(200).send('Hello World!');
});

app.listen(port || process.env.PORT, () => console.log(`Example app listening on port ${port}!`));

