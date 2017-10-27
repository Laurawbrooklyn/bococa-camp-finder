$(function() {
  $( "#submit-contact-us" ).click(function() {
    var newContact = {
      name: $( "#name" ).val(),
      email: $( "#email" ).val(),
      subject: $("#subject").val(),
      message: $("#message").val(),
    }
    console.log(newContact);
    $.ajax({
      url: `/camps`,
      type: "POST",
      data: JSON.stringify(newContact),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        console.log("yay! data");
        console.log(data);
      },
      error: function(errorData){
        console.log("err");
        console.log(errorData);
      },
    });
  });

});
