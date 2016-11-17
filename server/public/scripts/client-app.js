$(document).ready(function() {

  $('#petRegistration').on('submit', registerPet);

});

function registerPet(event) {
  event.preventDefault();
  var pet = {};
  $.each($(this).serializeArray(), function (index, input) {
    pet[input.name] = input.value;
  });

  $.ajax({
    type: 'POST',
    url: '/pets',
    data: pet,
    success: function (response) {
      console.log(response);
    },
    error: function (err) {
      console.log('Nuh, ohh...');
    }
  });
}
