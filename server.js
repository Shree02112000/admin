const express  = require('express')
const mongoose = require('mongoose')
const morgan   = require('morgan')
const bodyparser = require('body-parser')


// const authroute = require('./routes/auth')


const adminrout = require('./routes/adminroutes')

mongoose.connect('mongodb://localhost:27017/registerdb',{useNewUrlParser:true , useUnifiedTopology:true})

const db = mongoose.connection
db.on('error',(err)=>{
        console.log(err)
})
db.once('open',()=>{
    console.log('database is connected')
})

const app =express()
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})

// app.use('/api',authroute)
app.use('/api',adminrout)