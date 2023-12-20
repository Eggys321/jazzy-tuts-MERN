const mongoose = require('mongoose');
require('dotenv/config');


const MONGODB_URI = process.env.MONGODB_URI;

const connect = async ()=>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('momgoDB connected successfully');
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connect;