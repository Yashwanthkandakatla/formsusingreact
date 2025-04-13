const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require('cors');
const User = require("../models/user")

// mongoose.connect('mongodb+srv://user1:user1@cluster0.k6jqcsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log('mongodb connected')})




router.use(express.json())

router.get('/getusers',(req,res,next)=>{
    User.find()
    .then(user=>res.json(user))
    .catch(console.log("No Output"))
})

router.post('/submit',(req,res,next)=>{
    const {firstname,lastname,email} = req.body
    const data = {
        firstname:firstname,
        lastname:lastname,
        email:email
    }
    

    User.insertMany([data])
    
    res.json({
        message:'input is delivered',
    })

})




module.exports = router