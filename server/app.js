const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const db = require('./database');


app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT, DELETE, OPTIONS');
    next(); 
})
app.listen(3000, () => {
    console.log('listening on port 3000');
});



//routes

const postRoute = require('./routes/postRoute');

app.use('/', postRoute);
