$(document).ready(function() {
  $('#petInfoTable').on('click', '.deleteButton', deletePet);
});

function deletePet() {
  var id = $(this).parent().data('id');
  console.log(id);

  $.ajax({
    type: 'DELETE',
    url: '/pets/' + id,
    success: function(result) {
      //get pets from database and reappend
      getPets();
    },
    error: function(result) {
      console.log('could not delete book.');
    }
  });
}
