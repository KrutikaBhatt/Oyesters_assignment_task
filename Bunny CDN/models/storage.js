const mongoose = require('mongoose');

const StorageSchema = mongoose.Schema({
    created_by : {
        type: String,
        required: true
    },
    date :{
        type:Date,
        default:new Date()
    },
    storage_name :{
        type:String,
        required: true
    }
 
});

const StorageZone = mongoose.model('StorageZone',StorageSchema);
module.exports = StorageZone;