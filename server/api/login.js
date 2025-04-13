const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require('cors');
const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.use(express.json())

router.post('/',async (req,res,next)=>{
    // const {email,password} = req.body
    try{
    
            const {email,password}  =req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({message:'User with email ${email} not found'});
            }
            const isequal = await bcrypt.compare(password,user.password);
            if(!isequal){
                return res.status(400).json({message:'Invalid Credentials'});
            }
            const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});
            console.log(token)
            const role = user.role;
            res.status(200).json({token,role});
        }catch(err){
            res.status(500).json({message:'something went eorng',error:console.log(err)})
        }

})

module.exports = router