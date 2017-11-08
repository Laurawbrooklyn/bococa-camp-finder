$(document).ready(function() {
	var token = localStorage.getItem("token");
	
	if (!token) {
		$("#login").show()
		$("#sign-up").show()
		$("#logout").hide()
	} else {
		$("#login").hide()
		$("#sign-up").hide()
		$("#logout").show()
	}

	});
