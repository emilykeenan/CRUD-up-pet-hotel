$(document).ready(function(){
  console.log('jquery loaded');
  $('#petInfoTable').on('click', '.deleteButton', deletePet);
  $('#petInfoTable').on('click', '.updateButton', updatePet);
  getPets();
}); // end document ready

function updatePet(){
  event.preventDefault;
  var id= $(this).closest('tr').data('id');
  console.log("id in update " + id);
  var pets = {};
  var fields = $(this).closest('tr').find("input").serializeArray();
  fields.forEach(function(field){
      pets[field.name] = field.value;
    });
   //console.log($(this).closest('tr').find("input").serializeArray());

  //console.log($(this).parent().siblings());


   console.log(pets);
  $.ajax({
    type: 'PUT',
    url: '/pets/' + id,
    data: pets,
    success: function(result){
      // get pets from database and reappend
      getPets();
    },
    error: function(result) {
      console.log("could not update pet.");
    }
  })


}

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
    //console.log(pet);
    $('#petsTable').append(
      '<tr data-id="' + pet.unique_pet + '"data-owner_id= "'+ pet.owner_id + '">' +
      '<td> <input type="text" name="first_name" value=""' + pet.first_name
      + '" /><input type="text" name="last_name" value="' + pet.last_name
      +'"/>' +'</td>' + // refers to owner's first and last name
      '<td> <input type="text" name="name" value="' + pet.name + '"/></td>' +
      '<td> <input type="text" name="breed" value="' + pet.breed + '"/></td>' +
      '<td> <input type="text" name="color" value="' + pet.color + '"/></td>' +
      '<td>' + '<button class="updateButton">Go</button>' + '</td>' +
      '<td>' + '<button class="deleteButton">Delete</button>' + '</td>' +
      '<td>' + '<button class="checkInOutButton">'+ status +'</button>' + '</td>' +
      '</tr>'
    );


  }
}
