$(document).ready(function() {

  addOwnersToSelect();

  $('#petRegistration').on('submit', registerPet);

});

function registerPet(event) {
  event.preventDefault();
  var pet = {};
  $.each($(this).serializeArray(), function (index, input) {
    pet[input.name] = input.value;
  });

  if(pet.owner_id) {
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
  } else {
    alert('Please select an owner.');
  }
}

function addOwnersToSelect() {
  $.ajax({
    type: 'GET',
    url: '/owners',
    success: function (data) {
      var $owner = $('#owner');
      $owner.empty();

      // Value deliberately blank to enforce selecting owner
      $owner.append('<option value="">Select Owner</option>')

      // Add each owner from database
      data.forEach(function (owner) {
        $owner.append('<option value="' + owner.id + '">' + owner.first_name + ' ' + owner.last_name + '</option>')
      });
    },
    error: function (response) {
      console.log(response);
    }
  });
}
