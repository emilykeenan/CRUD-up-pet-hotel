function updatePet(event) {
  event.preventDefault;
  var $button = $(this);
  var id = $(this).parent().data('id');
  var ownerName = $button.closest('form').children().children('input[type=text]').val();
  var petName = $button.closest('form').children().next().children('input[type=text]').val();
  var petBreed = $button.closest('form').children().next().next().children('input[type=text]').val();
  var petColor = $button.closest('form').children().next().next().next().children('input[type=text], #petName').val();
  var petInfo = { id: id, name: petName, breed: petBreed, color: petColor };
  console.log('formData', petInfo);

  $.ajax({
    type: 'PUT',
    url: '/pets/' + id,
    data: petInfo
  });
};
