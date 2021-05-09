const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
const Router = require('./routes');

mongoose.connect('mongodb://localhost:27017/crudEx', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
        console.error('Database connection error')
    })

app.use(express.json())

app.use('/', Router)

app.listen(port, () => {
    console.log("Port runnning on 8080");
})