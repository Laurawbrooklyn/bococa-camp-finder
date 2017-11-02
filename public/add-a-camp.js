$(document).ready(function() {

$("#add-a-camp").submit(function(event) {
	event.preventDefault();
	// $(function() {
	// 	$( "#add-a-camp" ).click(function() {
			var newCamp = {
				name: $( "#name-input" ).val(),
				area: $( "#select-area" ).val(),
				age: $("#select-age").val(),
				price: $("#select-price").val(),
				specialty: $("#select-specialty").val(),
				website: $("#website-input" ).val(),
				picture: $("#picture-input").val(),
				content: $("#about-input").val()
			}
			console.log(newCamp);
			$.ajax({
				url: `/api/camps`,
				type: "POST",
				data: JSON.stringify(newCamp),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					$(".alert-success").removeClass("hidden")
					console.log(data);
				},
				error: function(errorData){
					console.log("err");
					console.log(errorData);
				},
			});
		});

	});
