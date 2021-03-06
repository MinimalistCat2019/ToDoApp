require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const mongoDB = `mongodb+srv://${dbUser}:${dbPass}@cluster0-ah9ei.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("successfully connected to database");
});

const userRouter = require('./routes/User');
app.use('/user', userRouter);

app.listen(5000, ()=>{
    console.log("express server started");
});