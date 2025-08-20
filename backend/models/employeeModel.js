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
        type:Number,
        required:true
    }
});
const Employee=mongoose.model('Employee',employeeSchema);
module.exports = Employee;
