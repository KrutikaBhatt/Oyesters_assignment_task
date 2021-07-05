const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');

// Get all the tasks
router.get('/allTask',async(req,res)=>{
    try {
        const allTasks = await Task.find();
        res.status(200).json(allTasks);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

// Create new Task

router.post('/createTask',async(req,res)=>{
    const {employee,subject,description,deadline} =  req.body;
    
    const newtask = new Task({
        employee : req.body.employee,
        subject : req.body.subject,
        description: req.body.description,
        deadline : req.body.deadline});
    try {
        await newtask.save(newtask)
        .then(
            res.redirect('/task/task')
        ).catch(err => console.log(err));
        console.log("Task creted");
        
    } catch (error) {
        res.status(409).json({message:error.message});
    }
});


router.post('/updateTask',async(req,res)=>{
    console.log(req.body);
    const id = req.body.id;
    const post = req.body;
    // Check if the Id is moongoose Id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No Task available with that id');
    }

    const newtask = await Task.findByIdAndUpdate(id,{...post,id},{new:true});
    res.redirect('/task/task');
});

router.delete('/deleteTask',async(req,res) =>{
    
    const id = req.query.id;
    console.log(id);

    Task.findByIdAndRemove(id);

    res.redirect('/task/task');
});

router.get('/find',(req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        Task.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found task with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving task with id " + id})
            })

    }else{
        Task.find()
            .then(task => {
                res.send(task)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving task information" })
            })
    }
})
  
module.exports = router;