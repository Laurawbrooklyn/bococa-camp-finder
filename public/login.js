$(document).ready(function() {

$("#login").click(function(event) {
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
					// $(".alert-success").removeClass("hidden")
					console.log(data);
          // window.location.href = "/login.html";
				},
				error: function(errorData){
					console.log("err");
					console.log(errorData);
				},
			});
		});

	});
