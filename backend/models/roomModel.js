const mongoose=require('mongoose');
const roomSchema=new mongoose.Schema({
    roomname:{
        type:String,
        required:true
    },
    noOfguests:{
        type:String,
        required:true
    },
    roomtype:{
        type:String,
        enum:['a/c','non a/c','luxury'],
        default:'non a/c'
    },
    facilities:{
        type:String,
        required:true
    },
    rentperday:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    url1:{
        type:String,
        required:true
    },
    url2:{
        type:String,
        required:true
    },
    url3:{
        type:String,
        required:true
    },
    currentbookings:[],

});
const Room=mongoose.model('Room',roomSchema);
module.exports=Room;

