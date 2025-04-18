const mongoose=require('mongoose');

const employeeSchema=new mongoose.Schema({
    empid:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    emptype:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }
});
const employee=mongoose.model('Employee',employeeSchema);
module.exports = employee;
