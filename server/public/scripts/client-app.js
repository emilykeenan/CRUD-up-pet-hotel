$(document).ready(function(){

$("#ownerRegButton").on('click', newOwner)

  console.log('jquery loaded');
  $('#petInfoTable').on('click', '.deleteButton', deletePet);
  getPets();
}); // end document ready


function deletePet() {
  var id = $(this).closest('tr').data('id');
  console.log(id);

  $.ajax({
    type: 'DELETE',
    url: '/pets/' + id,
    success: function(result) {
      //get pets from database and reappend
      getPets();
    },
    error: function(result) {
      console.log('could not delete pet.');
    }
  });
}

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
  $('#petsTable').append('<tr id="petTableHead">' +
      '<th>Owner</th>' +
      '<th>Pet</th>' +
      '<th>Breed</th>' +
      '<th>Color</th>' +
      '<th>Update</th>' +
      '<th>Delete</th>' +
      '<th>Check In/Out</th>' +
    '</tr>');
  for (var i = 0; i < pets.length; i++) {
    var pet = pets[i];
    if(pet.check_in == null) {
      var status = 'OUT';
    } else {
      var status = 'IN';
    }
    console.log(pet);
    $('#petsTable').append(
      '<tr data-id="' + pet.unique_pet + '">' +
      '<td>' + pet.first_name + ' ' + pet.last_name + '</td>' + // refers to owner's first and last name
      '<td>' + pet.name + '</td>' +
      '<td>' + pet.breed + '</td>' +
      '<td>' + pet.color + '</td>' +
      '<td>' + '<button class="updateButton">Go</button>' + '</td>' +
      '<td>' + '<button class="deleteButton">Delete</button>' + '</td>' +
      '<td>' + '<button class="checkInOutButton">'+ status +'</button>' + '</td>' +
      '</tr>'
    );


  }
}
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
