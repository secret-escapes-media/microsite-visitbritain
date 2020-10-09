// general js for the project that wouldn't be a reuseable component



/*==================================
MAP TOOL
*/

// Step 1
$('.js-origin').click(function(){
  var searchOrigin = $(this).attr('data-origin');
  $('#step-origin').attr('data-origin',searchOrigin);
  $('.search__window').removeClass('step-1').addClass('step-2');

  // update explore more with correct country from this step
  var country = $(this).attr('data-origin-country');
  var countrySlug = country.replace(/\s+/g, '-').toLowerCase();
  var countryHref = $('.js-explore-country a').attr('href');

  var countryImage = $('.js-explore-country').css('background-image');
  var countryImagePre = countryImage.split('pages/');
  $('.js-explore-country').css('background-image', countryImagePre[0]+'pages/'+countrySlug+'/nav.jpg")');

  $('.js-explore-country a').attr('href', countryHref + countrySlug);
  $('.js-explore-country .img__content').html('Explore more of ' + country);
});



// Step 2
$('.js-distance').click(function(){
  var searchDistance = $(this).attr('data-distance');
  $('#step-distance').attr('data-distance',searchDistance);
  $('.search__window').removeClass('step-2').addClass('step-3');
});



// Step 3
$('.js-map-filter').click(function(){
  var filterToggles = $('.js-map-filter');
  var filter = $(this).attr('data-filter');
  var map = $('#map');

  $(this).toggleClass('active');

  // if no filters active, return map to default
  if ( !$('.js-map-filter.active').length ){
    $('.marker').show();
  }else{
    $('.marker').hide();
  }

  filterToggles.each(function(){
    var filter = $(this).attr('data-filter');
    if( $(this).hasClass('active') ){
      $('.marker--'+filter).show();
    }
  });

});

// reset
$('.js-search-reset').click(function(){
  $('#step-origin').attr('data-origin',"");
  $('#step-distance').attr('data-distance',"");
  $('.search__window').removeClass().addClass('search__window step-1');
});



/*==================================
QUERY STRING BYPASSES
*/

if (getQueryStringByName('from-map')) {
  $('.js-back-to-map').show();
}
if (getQueryStringByName('from-modal')) {
$('.search__window').removeClass('step-1').addClass('step-3');
}


