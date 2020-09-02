// general js for the project that wouldn't be a reuseable component

$('.js-origin').click(function(){
  var searchOrigin = $(this).attr('data-origin');
  $('#step-origin').attr('data-origin',searchOrigin);
  $('#search').removeClass('step-1').addClass('step-2');
});

$('.js-distance').click(function(){
  var searchDistance = $(this).attr('data-distance');
  $('#step-distance').attr('data-distance',searchDistance);
  $('#search').removeClass('step-2').addClass('step-3');
});

$('.js-map-filter').click(function(){
  var filterToggles = $('.js-map-filter');
  var filter = $(this).attr('data-filter');
  var map = $('#map');

  $(this).toggleClass('active');

  filterToggles.each(function(){
    var filter = $(this).attr('data-filter');
    if( $(this).hasClass('active') ){
      map.removeClass('hide-'+filter);
    }else{
      map.addClass('hide-'+filter);
    }
  });

  // if no filters active, return map to default
  if ( !$('.js-map-filter.active').length ){
    map.removeClass().addClass('mapboxgl-map');
  }

});

// reset
$('.js-search-reset').click(function(){
  $('#step-origin').attr('data-origin',"");
  $('#step-distance').attr('data-distance',"");
  $('#search').removeClass().addClass('step-1');
});

