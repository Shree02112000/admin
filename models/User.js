const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name :{
        type: String,
        required:true
    }, 

    email :{
        type: String,
        // unique: true,
        required:true
    },
    phone:{
        type: Number,
        // unique:true,
        required:true
    },
    password:{
        type: String,
        required:true

    }
},{timestamps:true})


const User = mongoose.model('User',UserSchema)

module.exports=User
