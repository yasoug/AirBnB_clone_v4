// Listen for changes on each input checkbox, and updates Amenities
$(document).ready(function () {
  let lsAmeni = [];
  $('input[type=checkbox]').change(function () {
    const name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      lsAmeni.push(name);
    } else {
      lsAmeni = lsAmeni.filter(amen => amen !== name);
    }
    $('.amenities h4').text(lsAmeni.join(', '));
  });

  // Update the API status and add/remove the "available" class
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
