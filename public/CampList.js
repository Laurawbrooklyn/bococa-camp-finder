$(function() {
	$.ajax({
		url: `/camps`,
		type: "GET",
//		data: JSON.stringify(newCamp),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data){
			console.log("yay! data");
			console.log(data);
			renderCamps(data);
		},
		error: function(errorData){
			console.log("err");
			console.log(errorData);
		},
	});
});

function renderCamps(campArray){
	for (i = 0; i < campArray.length; i++) { 
		let currentCamp = campArray[i];
		let renderedCamp = `<div class="mt-3 col-sm-12 text-center camp-card mx-auto">
		<h3><a href="/campdetail.html">${currentCamp.name}</a></h3>
		<p>${currentCamp.area}</p>
		<p>${currentCamp.age}</p>
		<a href="${currentCamp.website}">${currentCamp.website}</a>
		</div>`
		$(".camp-list").append(renderedCamp)
	}
}
