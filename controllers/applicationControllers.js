console.log("application")
var models  = require('../models');
var express = require('express');
var path = require('path');

var router  = express.Router();

router.get('/login',function(req,res){
	res.locals.errors = req.flash();
    console.log(res.locals.errors);
	res.sendFile(path.join(__dirname + '/../public/login.html'));
})

router.get('/register',function(req,res){
	res.sendFile(path.join(__dirname + '/../public/register.html'));
})


module.exports = router;