const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/task',(req,res,next)=>{
    axios.get('http://localhost:8080/api/allTask').then(function(response){
        res.render('tasks', { tasks : response.data });
    })
    .catch(err =>{
        res.send(err);
    })

})

router.get('/addTask',(req,res)=>{
    res.render('addTask');
})

router.get('/updateTask',(req,res)=>{
    axios.get('http://localhost:8080/api/find', { params : { id : req.query.id }})
    .then(function(taskdata){
        res.render("update_task", { task: taskdata.data})
    })
    .catch(err =>{
        console.log(err);
        res.send(err);
    })
})

router.get('/deleteTask',(req,res)=>{
    axios.delete('http://localhost:8080/api/deleteTask', { params : { id : req.query.id }})
    .catch(err =>{
        console.log(err);
    })
})

module.exports = router;