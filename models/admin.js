const mongoose=require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({

    name :{
        type: String,
        required:true
    }, 

    email :{
        type: String,
         unique: true,
        required:true
    },
    phone:{
        type: Number,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true

    },
    confirmpassword:{
        type: String,
        required:true
    }

},{timestamps:true})


const admin = mongoose.model('admin',adminSchema)

module.exports=admin
