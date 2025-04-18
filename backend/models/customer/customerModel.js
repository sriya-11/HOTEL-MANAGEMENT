const mongoose=require("mongoose");

const customeSchema=new mongoose.Schema({
    cusname:{
        type:String,
        required:true
    },
    cusemail:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','customer'],
        default:'customer'
    },
});

const customer = mongoose.model('customer',customeSchema);
module.exports=customer;