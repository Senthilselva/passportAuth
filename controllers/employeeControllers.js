var express = require('express');
var bcrypt = require('bcryptjs');
var models  = require('../models');
var router  = express.Router();
var path = require('path');

router.post('/create', function(req,res) {
	console.log("inside create");
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var userName = req.body.email;
	var address = req.body.address;
	var password =req.body.password;
	console.log(firstName)
	var salt = bcrypt.genSaltSync(10);
  	var hashedPassword = bcrypt.hashSync(password, salt);
console.log("here" + salt)

  	var newEmployee = {
  		firstName : firstName,
  		lastName : lastName,
  		userName : userName,
  		salt : salt,
  		password : password
  	}
  	console.log(JSON.stringify(newEmployee))
  	models.Employee.create(newEmployee).then(function(){
  		console.log("Employee Created")
  		res.send("Employee Created")
  	}).catch(function(error) {
    //req.flash('error', "Please, choose a different username.")
    console.log(error)
    res.send("error");
  })

});

module.exports = router;