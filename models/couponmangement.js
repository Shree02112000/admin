const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const couponSchema = new Schema({
offer_name:{
         type:String,
         unique:true
},
coupon_name:{
        type:String,
        unique:true

},
start_date:{
        type:String

},
end_date:{
        type:String
},
discount_percentage:{
        type:String
},
discount_amount:{
    type:String
},
isactive:{
        type:Boolean
}
},{timestamps:true})

couponSchema.plugin(mongoosePaginate)

const couponmangement= mongoose.model('couponmangment',couponSchema)

module.exports=couponmangement
