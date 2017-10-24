//SHOW ALL CAMPS FUNCTION BELOW:

$(function() {
	$("#show-filters").hide();
	$("#show-filters-button").click(function() {
		$("#filters").show();
		$("#show-filters").hide();
		$(".camp-list").text("");
	});
	$("#search-with-filters-button").click(function() {
		$("#filters").hide();
		$("#show-filters").show();

		var searchParams = {}

			var area = $( "#select-area" ).val();
			if (area !=="All Areas"){
				searchParams.area=area
			}
			var age = $( "#select-age").val();
			if (age !=="All Ages"){
				searchParams.age=age
			}
			var specialty = $("#select-specialty").val();
			if (specialty !=="All Camps"){
				searchParams.specialty=specialty
			}
			var price = $("#select-price").val();
			if (price !=="All Prices"){
				searchParams.price=price
			}

		console.log(searchParams);

		$.ajax({
			url: `/camps/filters`,
			type: "POST",
					data: JSON.stringify(searchParams),
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

	$("#search-all-button" ).click(function() {
		$("#filters").hide();
		$("#show-filters").show();
		$.ajax({
			url: `/camps`,
			type: "GET",
			//		data: JSON.stringify(newCamp),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				renderCamps(data);
			},
			error: function(errorData){
				console.log(errorData);
			},
		});
	});

});

function renderCamps(campArray){
	for (i = 0; i < campArray.length; i++) {
		let currentCamp = campArray[i];
		let renderedCamp = `<div class="mt-3 col-sm-12 text-center camp-card mx-auto">
		<hr>
		<h4><a href="/campdetail.html#${currentCamp.id}">${currentCamp.name}</a></h4>
		<p>${currentCamp.area}</p>
		<p>${currentCamp.age}</p>
		<a href="${currentCamp.website}">${currentCamp.website}</a>
		</hr>
		</div>`
		$(".camp-list").append(renderedCamp)
	}
}
