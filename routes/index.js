const express = require('express');
const router = express.Router();
const {routeRestrictions,forwardAuthenticated} = require('../config/restrictions');

router.get('/',forwardAuthenticated,(req, res,next)=>{
    res.render("home");
});

router.get('/dashboard',routeRestrictions,(req,res,next)=>{
    res.render("dashboard",{
        user:req.user
    });
})

module.exports = router;
