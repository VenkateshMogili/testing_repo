$(document).ready(function () {
  $("#submit").click(function () {
    //To Display progress bar 
    $("#loading").show();

    var name = $("#name").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var address = $("#address").val();

    //transfering form information to different page without page refresh
    $.post("processing.php", {name: name, email: email, mobile: mobile, address: address},
      function (status) {

        //To Hide progress bar 
        $("#loading").hide();
        alert(status);
      });
  });
});
