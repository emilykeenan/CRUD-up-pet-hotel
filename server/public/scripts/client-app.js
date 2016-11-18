$(document).ready(function(){

$("#ownerRegButton").on('click', newOwner)

});

function newOwner() {
  event.preventDefault();

  var owner = {};

  $.each($('#ownerRegistration').serializeArray(), function (i, field) {
    owner[field.name] = field.value;
  });

  console.log('owner: ', owner);

  $.ajax({
    type: 'POST',
    url: '/owners',
    data: owner,
    success: function(response) {
      alert("New Owner added!");
    },
    error: function() {
      console.log('could not post a new owner');
    }
  })
}
