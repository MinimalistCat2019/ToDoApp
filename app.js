const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const mongoDB = `mongodb+srv://${user}:${pass}@cluster0-ah9ei.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("successfully connected to database");
});

app.listen(5000, ()=>{
    console.log("express server started");
});