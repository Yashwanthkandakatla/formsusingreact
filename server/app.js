const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = express()
const dbConnect = require('./config/db');
const cors = require('cors');
const register = require('./api/register')
const login = require('./api/login')
// const user =require('./api/userroutes')
const user = require('./api/ussert')
const fileroute = require('./api/file')
const aiapi = require('./api/aiapi')
const comment  = require('./api/comment')
// const survey = require('./api/survey')

require('dotenv').config();
dbConnect();
// mongoose.connect('mongodb+srv://user1:user1@cluster0.k6jqcsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log('mongodb connected')})



app.use(cors({
    origin: "https://grovnr.netlify.app/",  // Specify the front-end origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // If your requests involve credentials (e.g., cookies)
  }));

app.use('/register',register)
app.use('/login',login)
// app.use('/survey',survey)
app.use('/user',user)
app.use('/file',fileroute)
app.use('/ai',aiapi)
app.use('/comment',comment)


module.exports = app
