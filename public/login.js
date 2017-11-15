$(document).ready(function() {

	$("#login-form").click(function(event) {
		event.preventDefault();
		let username = $( "#username-input" ).val();
		let password = $("#password-input").val();
		login(username, password)
	});
	$("#login-test").click(function(event) {
		let username = 'testusername'
		let password = 'test1234'
		login(username, password)
	});

});

function login(username, password) {
	var loginData = {
		username,
		password
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
			window.location.href = "/add-a-camp.html";
		},
		error: function(errorData){
			console.log("err");
			console.log(errorData);
		},
	});
}
