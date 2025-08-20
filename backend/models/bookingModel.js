const mongoose = require("mongoose");

const roombookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  roomtype: {
    type: String,
    required: true,
  },
  noOfGuests: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const RoomBooking = mongoose.model('RoomBooking', roombookingSchema);
module.exports = RoomBooking;


// const mongoose = require("mongoose");

// const roombookingSchema = new mongoose.Schema({
//   customerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Customer',
//     required: true,
//   },
//   roomId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Room',
//     required: true,
//   },
//   noOfGuests: {
//     type: Number,
//     required: true,
//   },
//   startDate: {
//     type: Date,
//     required: true,
//   },
//   endDate: {
//     type: Date,
//     required: true,
//   },
//   contactNo: {
//     type: String,
//     required: true,
//   }
// }, { timestamps: true });

// const RoomBooking = mongoose.model('RoomBooking', roombookingSchema);
// module.exports = RoomBooking;



// const mongoose = require("mongoose");

// const roombookingSchema = new mongoose.Schema({
//     fname : {
//         type: String, 
//         required : true
//     },
//     lname : {
//         type: String, 
//         required : true 
//     },
//     roomtype : {
//         type: String, 
//         required : true
//     },
//     noofguests : {
//         type: Number,
//         required : true 
//     },
//     from: { 
//         type: String, 
//         required : true 
//     },
//     to: { 
//         type: String, 
//         required : true 
//     },
//     email : { 
//         type: String, 
//         required : true 
//     },
//     contactno : { 
//         type: Number, 
//         required : true 
//     },
   

   
// });

// const RoomBooking = mongoose.model('roombooking', roombookingSchema);
// module.exports = RoomBooking;