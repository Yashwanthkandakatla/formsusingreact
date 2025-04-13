const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcryptjs')
const User = require("../models/user")

router.use(express.json())

router.post('/',async (req,res,next)=>{
    try{
            const {email,name,password,rollno,role} = req.body;
            const hashedpassword = await  bcrypt.hash(password,10);
            const newuser =await  new User({email,name,password:hashedpassword,rollno,role});
            await newuser.save();
            res.status(201).json({message:'User registered with username', email});
        }
        catch(err){
            console.error("Error during registration",err);
            res.status(500).json({message:'something went wrong',error:err.message});
        }
    


})
module.exports = router
