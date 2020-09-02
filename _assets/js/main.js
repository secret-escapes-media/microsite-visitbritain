// general js for the project that wouldn't be a reuseable component

var steps = $('.js-search').find('.js-step');

$('.js-step').hide();
$('.js-step-active').show();

$('.js-step-to-2').click(function(){
  $('#step1').hide();
  $('#step2').show();
  $('#search').addClass('step-2');
});

$('.js-step-to-3').click(function(){
  $('#step2').hide();
  $('#step3').show();
  $('#search').addClass('step-3');
});


// Waits for window to finish resizing before running code
function debouncer( func , element ) {
   var timeoutID , timeout = timeout || 200;
   return function () {
      var scope = this , args = arguments;
      clearTimeout( timeoutID );
      timeoutID = setTimeout( function () {
          func.apply( scope , Array.prototype.slice.call( args ) );
      } , timeout );
   };
}

function windowResize(func) {
  $(window).resize(debouncer(function(event){
    func();
  }));
}



function map(){

  // launch map with settings
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtaXNoamdyYXkiLCJhIjoiY2pkbjBmeGN6MDd1YzMzbXI3cWdpNThjayJ9.3YE8T1H2QUyqNIkxdKWxkg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hamishjgray/ckek0njfp0psd1ar0a7f23v11',
    logoPosition: 'bottom-right',
    zoom: 8,
    interactive: false
  });

  map.on('load', function(event) {

    ///////////// add the poi marker data so it can create clusters
    // map.addSource("poi-markers", {
    //   type: "geojson",
    //   data: geojson,
    // });

    ///////////// adds normal marker when there is no cluster
    geojson.features.forEach(function(marker) {
      // create a HTML element for each feature
      var el = document.createElement('a');
      el.className = 'marker js-open-modal';
      el.setAttribute('data-open-modal', marker.properties.id);

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });

    ///////////// Launches modal when marker is clicked
    // map.on('click', 'poi-markers-layer', function (e) {
    //   var clickedModalId = e.features[0].properties.id;
    //   modalOpen(null, clickedModalId);
    // });

    ///////////// center the map markers within the viewport
    var bounds = new mapboxgl.LngLatBounds();
    function getMapBounds() {
      geojson.features.forEach(function(feature) {
        bounds.extend(feature.geometry.coordinates);
      });
      map.fitBounds(bounds, {padding: 80}); // adds padding so markers aren't on edge
    }
    getMapBounds(); // resets the view when the map loads
    windowResize(getMapBounds); // resets the view after the viewport has finished resizing

  });
}

$(document).ready(function(){
  map();
});
