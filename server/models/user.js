const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://user1:user1@cluster0.k6jqcsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const userschema = new mongoose.Schema({
    firstname :String,
    lastname:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Faculty","Student"],
        required:true
    }
},{timestamps:true})


const usermodel = mongoose.model("Userroles",userschema,"userroles")

module.exports = usermodel

