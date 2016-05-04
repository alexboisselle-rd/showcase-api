$(document).ready(function(){
	
	populateList();

	$("#submitBtn").on("click", function(e){

		e.preventDefault();

		if($("#nameBox").val()){

			addToList($("#nameBox").val());
		}
	});
});

function addToList(value){
	console.log("adding to list");

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/todos",
		data: {
			name: value
		}
	}).done(function(data){
		populateList();

		$("#nameBox").val("");
	});
}

function populateList(){
	console.log("populate");

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/todos"
	}).done(function(data){

		var html = "";

		for(var t in data){
			var task = data[t];

			if(task.name){
				html += "<p id='" + task._id + "'>" + task.name + " - Status: " + (task.completed ? "Completed" : "Incomplete <a class='complete-button' href='#'>Mark Complete</a>") + " - <a href='#' class='remove-button'>Remove</a></p>";
			}
		}

		$('#container').html(html);

		$('.complete-button').on('click', function(e){
			
			var elementClicked = e.target;

			var parent = $(elementClicked).parent('p');

			var id = $(parent).attr('id');

			$.ajax({
				url: 'http://localhost:3000/todos/' + id,
				type: 'PUT',
				data: {
					completed: true
				}
			}).done(function(){
				console.log("Task number: " + id + " marked as complete.");
				populateList();
			});
		});

		$('.remove-button').on('click', function(e){
			var elementClicked = e.target;

			var parent = $(elementClicked).parent('p');

			var id = $(parent).attr('id');

			$.ajax({
				url: 'http://localhost:3000/todos/' + id,
				type: 'DELETE'
			}).done(function(){
				console.log("Task number: " + id + " deleted.");
				populateList();
			});
		});
	});
}