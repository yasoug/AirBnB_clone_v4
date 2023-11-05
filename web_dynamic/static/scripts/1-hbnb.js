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
});
