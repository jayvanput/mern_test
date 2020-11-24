const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB db connection established successfully")
})

const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const crosswordRouter = require('./routes/crosswords');

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);
app.use('/crosswords', crosswordRouter);

app.use('/', (req, res, next) => {
    res.send('hi')
})
app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})