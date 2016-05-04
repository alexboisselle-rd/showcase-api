var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Car = require('../models/Car.js');

/* GET cars listing. */
router.get('/', function(req, res, next) {

	console.log("==============================");
	console.log("Find all from cars collection");

	//Go get all "Car" types from DB
	Car.find(function (err, cars) {

		//If there's an error, move on and pass the error
		if (err){

			console.log("ERROR: GET cars/");
			console.log(err);

			return next(err);
		}

		//If all is good, respond with the cars
		res.json(cars);
	});

});

router.put('/:id', function(req, res, next){
	console.log("");
	console.log("======================");
	console.log("PUT request to todos/");
	console.log(req.body);

	TaskModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
	    if(err){
	    	return next(err);
	    } else {
	    	res.json(post);
	    }
    });
});

router.get('/:id', function(req, res, next){

	var id = req.params.id;

	console.log("==============================");
	console.log("Search by id: " + id + " in cars collection");

	//go get the car by ID
	Car.findById(id, function (err, post) {

		//If there's an error, move ond pass the error
    	if (err) {
    		return next(err);
    	}

    	//If all is good, respond with the cars
    	res.json(post);
  	});
});

router.post('/', function(req, res, next) {

	console.log("==============================");
	console.log("Create Car in cars collection");
	console.log(req.body);

	//Create new car object
	Car.create(req.body, function (err, post) {

		//If there's an error, move on and pass the error
		if (err){
			return next(err);
		}

		//If all is good, respond with confirmation 
		res.json(post);
	});
});


module.exports = router;
