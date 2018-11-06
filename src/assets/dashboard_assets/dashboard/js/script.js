var data = '';
var action = '';
var savebutton = "<input type='button' class='ajaxsave  btn btn-success' value='Save'>";
var updatebutton = "<input type='button' class='ajaxupdate btn btn-success' value='Update'>";
var cancel = "<input type='button' class='ajaxcancel btn btn-warning' value='Cancel'>";
var emailfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var pre_tds;
var field_arr = new Array('text', 'text', 'text', 'text');
var field_pre_text = new Array('');
var field_name = new Array();
$(function () {
  $.ajax({
    url: "DbManipute.php",
    type: "POST",
    data: "actionfunction=showData",
    cache: false,
    success: function (response) {

      $('#demoajax').html(response);
      createInput();

    }

  });


  $('#demoajax').on('click', '.ajaxsave', function () {

    if (validate(l)) {
      data = "";
      $.ajax({
        url: "DbManipute.php",
        type: "POST",
        data: data,
        cache: false,
        success: function (response) {
          if (response != 'error') {
            $('#demoajax').html(response);
            createInput();
          }
        }

      });
    }
    else {
      return;
    }
  });
  $('#demoajax').on('click', '.ajaxedit', function () {
    var edittrid = $(this).parent().parent().attr('id');
    var tds = $('#' + edittrid).children('td');
    var tdstr = '';
    var td = '';
    pre_tds = tds;
    for (var j = 0; j < field_arr.length; j++) {

      tdstr += "<td><input class='form-control' type='" + field_arr[j] + "' name='" + field_name[j] + "' value='" + $(tds[j]).html() + "' placeholder='" + field_pre_text[j] + "'></td>";
    }
    tdstr += "<td>" + updatebutton + "</td>" + "<td>" + cancel + "</td>";
    $('#createinput').remove();
    $('#' + edittrid).html(tdstr);
  });

  $('#demoajax').on('click', '.ajaxupdate', function () {
    var edittrid = $(this).parent().parent().attr('id');
    if (validate()) {
      data = "";
      $.ajax({
        url: "DbManipute.php",
        type: "POST",
        data: data,
        cache: false,
        success: function (response) {
          if (response != 'error') {
            $('#demoajax').html(response);
            createInput();
          }
        }

      });
    }
    else {
      return;
    }
  });
  $('#demoajax').on('click', '.ajaxdelete', function () {
    var edittrid = $(this).parent().parent().attr('id');

    data = "deleteid=" + edittrid + "&actionfunction=deleteData";
    $.ajax({
      url: "DbManipute.php",
      type: "POST",
      data: data,
      cache: false,
      success: function (response) {
        if (response != 'error') {
          $('#demoajax').html(response);
          createInput();
        }
      }

    });
  });
  $('#demoajax').on('click', '.ajaxcancel', function () {
    var edittrid = $(this).parent().parent().attr('id');

    $('#' + edittrid).html(pre_tds);
    createInput();
  });
});

function createInput() {
  var blankrow = "<tr id='createinput'>";
  for (var i = 0; i < field_arr.length; i++) {
    blankrow += "";
  }
  blankrow += "";
  $('#demoajax').append(blankrow);
}
