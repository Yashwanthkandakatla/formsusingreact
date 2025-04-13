const express = require("express")
const router = express.Router()
const verifytoken = require('../middleware/verifytoken')
const authorizeRoles = require('../middleware/rolemiddleware')
const User = require('../models/user');
// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');

const mongourl = 'mongodb+srv://user1:user1@cluster0.k6jqcsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//only admin will have access
const conn = mongoose.createConnection(mongourl);

router.get('/admin', verifytoken,authorizeRoles(["Admin"]), (req,res)=>{
    res.json({message:"Welcome Admin"})
    // /user/admin/home
});

//faculty will have access 
router.get('/faculty',verifytoken,authorizeRoles(["Faculty"]),(req,res)=>{
    res.json({message:"Welcome faculty"})
});

//student will have access
router.get('/student',verifytoken,authorizeRoles(["Student"]),(req,res)=>{
    res.json({message:"Welcome student"})
});







 




  




  


module.exports  = router