$(function() {
  $( "#contact-us-form" ).submit(function(event) {
    event.preventDefault()
    var newContact = {
      name: $( "#name" ).val(),
      email: $( "#email" ).val(),
      subject: $("#subject").val(),
      content: $("#message").val(),
    }
    console.log(newContact);
    $.ajax({
      url: `/api/contact-us`,
      type: "POST",
      data: JSON.stringify(newContact),
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
