$(document).ready(function() {

$("#sign-up-form").click(function(event) {
	event.preventDefault();

			var newUser = {
				username: $( "#username-input" ).val(),
				password: $("#password-input").val(),
        email: $("#email-input").val()
			}
			console.log(newUser);
			$.ajax({
				url: `/api/users`,
				type: "POST",
				data: JSON.stringify(newUser),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					// $(".alert-success").removeClass("hidden")
					console.log(data);
          window.location.href = "/login.html";
				},
				error: function(errorData){
					console.log("err");
					console.log(errorData);
				},
			});
		});

	});
