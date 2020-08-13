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

// this section is just to mock up a test, in lieu of a front end
const User = require('./models/User');
const userInput = {
    username: "noobie1234", 
    password: "1234567", 
    role: "admin"
}

const user = new User(userInput);

user.save(function (err, document) {
    if(err) return console.error(err);
    console.log("user inserted successfully", document)
});

// end of mock up section

app.listen(5000, ()=>{
    console.log("express server started");
});