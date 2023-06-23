const mongoose = require("mongoose");
require('dotenv').config()

const mongoURL = process.env.mongoURL;

const connectToMongo = async ()=>{
    try{
        await mongoose.connect(mongoURL)
        console.log("Connected to mongoDb successfully")
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = connectToMongo;