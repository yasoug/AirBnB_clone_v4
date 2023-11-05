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

  // Load Places from front-end, not from the back-end
  function fetchDisplayPlaces () {
    const placeUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
    const requestData = JSON.stringify({});
    $.ajax({
      type: 'POST',
      url: placeUrl,
      contentType: 'application/json',
      data: requestData,
      success: function (places) {
        $('section.places').empty();
        places.forEach(function (place) {
          const article = $('<article></article>');
          const placeName = $('<h2></h2>').text(place.name);
          const placePrice = $('<div class="price_by_night"></div>').text('$' + place.price_by_night);
          const placeDescription = $('<div class="information"></div>').text(place.description);
          article.append(placeName, placePrice, placeDescription);
          $('section.places').append(article);
        });
      }
    });
  }
  fetchDisplayPlaces();
});
