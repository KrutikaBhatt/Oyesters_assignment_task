const mongoose = require('mongoose');

const pullzone = mongoose.Schema({
    created_by : {
        type: String,
        required: true
    },
    date :{
        type:Date,
        default:new Date()
    },
    pullzone_name :{
        type:String,
        required: true
    },
    pullzoneId_Id :{
        type:String,
        required: true
    },
    related_storageId :{
        type:String,
        required: true
    }
});


const Pullzone = mongoose.model('Pullzone',StorageSchema);
module.exports =  Pullzone;