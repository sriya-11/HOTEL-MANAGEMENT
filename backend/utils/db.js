const mongoose = require('mongoose');


async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.error("Database connection failed", error.message);
        throw error;
    }
}

module.exports = dbConnect;

// const mongoose = require('mongoose')
// require('dotenv').config()
// const DB_URL=process.env.DB_URL
// const DB_NAME=process.env.DB_NAME

// async function dbConnect(){
//     try {
//         await mongoose.connect(`${DB_URL}/${DB_NAME}`)
//         console.log("Database Connected")
//     } catch (error) {
//         throw error
//     }
// }

// module.exports = dbConnect