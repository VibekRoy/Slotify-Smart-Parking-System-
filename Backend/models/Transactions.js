const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transactionID:{
        type:Number
    },
    user:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        requried:true
    },
    slot_id:{
        type:String,
        required:true
    }
})