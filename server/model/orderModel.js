const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderItems:[
        {
            title:{type:String,required:true},
            description:{type:String,required:true},
            quantity:{type:Number,required:true},
            image:{type:String,required:true},
            price:{type:Number,required:true},
            category:{type:String,required:true},

        }
    ],
    recipient:{
        firstname:{type:String,required:true},
        lastname:{type:String,required:true},
        email:{type:String,required:true},
        phonenumber:{type:String,required:true,minlength:[10,"Minimum phone number length must be 10"]},
    },
    address:{
        city:{type:String,required:true},
        housenumber:{type:String,required:true},
        street:{type:String,required:true,maxlength:[15,"Maximum street length must be 15 letters"]},
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true,
    },
    payment:{
        type:String,
        default:"cash",
        required:true
    },
    totalprice:{
        type:Number,
        required:true,
        default:0.0,
    }
});

const ORDER = mongoose.model('order',orderSchema);
module.exports = ORDER