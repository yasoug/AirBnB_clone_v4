$(document).ready(function () {
  // Update the API status and add/remove the "available" class
  function updateApiStatus () {
    const statusUrl = 'http://0.0.0.0:5001/api/v1/status/';
    $.get(statusUrl, function (response) {
      if (response.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
  }
  updateApiStatus();
  const selectedAmenities = {};
  function fetchDisplayPlaces () {
    const placeUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
    const requestData = JSON.stringify({ amenities: Object.keys(selectedAmenities) });
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
  // Listen for changes on each input checkbox, and updates Amenities
  $('input[type="checkbox"]').click(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    const amenityList = Object.values(selectedAmenities).join(', ');
    if (amenityList.length > 25) {
      $('.amenities h4').text(amenityList.substring(0, 24) + '...');
    } else {
      $('.amenities h4').text(amenityList);
    }
    if ($.isEmptyObject(selectedAmenities)) {
      $('.amenities h4').html('&nbsp;');
    }
  });
  $('button').click(function () {
    fetchDisplayPlaces();
  });
  fetchDisplayPlaces();
});
