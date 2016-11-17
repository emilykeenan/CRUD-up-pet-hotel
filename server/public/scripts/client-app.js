$(document).ready(function(){
  console.log('jquery loaded');

  getPets();


}); // end document ready


function getPets() {
  $.ajax({
  type: 'GET',
  url: '/pets',
  success: function(petsData) {
    appendPets(petsData);
  },
  error: function() {
    console.log('Database error');
  }

})
}

function appendPets(pets) {
  $('#petsTable').empty();
  $('#petsTable').append('    <tr id="petTableHead">'
      '<th>Owner</th>' +
      '<th>Pet</th>' +
      '<th>Breed</th>' +
      '<th>Color</th>' +
      '<th>Update</th>' +
      '<th>Delete</th>' +
      '<th>Check In/Out</th>' +
    '</tr>')
  for (var i = 0; i < pets.length; i++) {
    var pet = pets[i];
    $('#petsTable').append(
      '<tr>' +
      '<td>' + pet.first_name + pet.last_name + '</td>' +
      '<td>' + pet.name + '</td>' +
      '<td>' + pet.breed + '</td>' +
      '<td>' + pet.color + '</td>' +
      '<td>' + '<button id="updateButton">Go</button>' + '</td>' +
      '<td>' + '<button id="deleteButton">Delete</button>' + '</td>' +
      '<td>' + '<button id="checkInOutButton">'+ pet.check_in +'</button>' + '</td>' +
      '</tr>'
    );


  }
}
