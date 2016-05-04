var express = require('express');
var mongoose = require('mongoose');

var TaskModel = require('../models/TaskModel.js');

var router = express.Router();

router.get('/', function(err, res, next){
	console.log("");
	console.log("=====================");
	console.log("GET request to todos/");

	TaskModel.find(function(err, tasks){
		if(err){
			return next(err);
		} else {
			res.json(tasks);
		}
	});
});

router.post('/', function(req, res, next){
	console.log("");
	console.log("======================");
	console.log("POST request to todos/");
	console.log(req.body);

	TaskModel.create(req.body, function(err, post) {

		if(err){
			return next(err);
		} else {

			console.log("Entry created, here's what it looks like:");
			console.log(post);
			
			res.json(post);
		}
	});
});


router.put('/:id', function(req, res, next){
	console.log("");
	console.log("======================");
	console.log("PUT request to todos/");
	console.log(req.body);

	TaskModel.findByIdAndUpdate(req.params.id, req.body, function(err, post){
		if(err){
			return next(err);
		} else {

			console.log("Entry updated, here's what it used to look like:");
			console.log(post);

			res.json(post);
		}
	});
});


router.delete('/:id', function(req, res, next){
	console.log("");
	console.log("======================");
	console.log("PUT request to todos/");
	console.log(req.body);

	TaskModel.findOneAndRemove({'_id': req.params.id}, function(err, post){
		if(err){
			return next(err);
		} else {

			console.log("Entry deleted, here's what it used to look like:");

			res.json(post);
		}
	});
});

module.exports = router;