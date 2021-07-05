const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    employee:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    assigned_at :{
        type:Date,
        default :new Date()
    },
    deadline :{
        type:String,
        required:true
    }
});

const Task = mongoose.model('Task',TaskSchema);
module.exports = Task;