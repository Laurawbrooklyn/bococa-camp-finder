$(function() {
	let campId = window.location.hash.substr(1);
	$.ajax({
		url: `/camps/${campId}`,
		type: "GET",
//		data: JSON.stringify(newCamp),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data){
		console.log("yay! data");
		console.log(data);
		renderCampDetail(data);
		},
		error: function(errorData){
		console.log("err");
		console.log(errorData);
},
});
});


function renderCampDetail(camp){
	
		let renderedCampDetail = `<div class="mt-3 col-sm-12 camp-card mx-auto">
		<h3>${camp.name}</h3>
		<p><b>Area: </b>${camp.area}</p>
		<p><b>Website: </b><a href="${camp.website}">${camp.website}</a></p>
		<p><b>Ages: </b>${camp.age}</p>
		<p><b>Specialty: </b>${camp.specialty}</p>
		<p><b>Price Per Week: </b>${camp.price}</p>
		`
		$(".camp-detail").append(renderedCampDetail)
		$("#camp-about").text(camp.content)
}
