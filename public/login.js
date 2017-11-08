$(document).ready(function() {

$("#login-form").click(function(event) {
	event.preventDefault();

			var loginData = {
				username: $( "#username-input" ).val(),
				password: $("#password-input").val(),
			}
			console.log(loginData);
			$.ajax({
				url: `/api/auth/login`,
				type: "POST",
				data: JSON.stringify(loginData),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					var token = data.authToken
					localStorage.setItem('token', token);
					console.log(token);
          window.location.href = "/add-a-camp.html";
				},
				error: function(errorData){
					console.log("err");
					console.log(errorData);
				},
			});
		});

	});
