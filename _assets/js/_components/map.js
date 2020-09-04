


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




// Create mapbox with markers as HTML elements
if( $('#map').length > 0 ){
  $(document).ready(function(){

    // launch map with settings
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtaXNoamdyYXkiLCJhIjoiY2pkbjBmeGN6MDd1YzMzbXI3cWdpNThjayJ9.3YE8T1H2QUyqNIkxdKWxkg';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/hamishjgray/ckek0njfp0psd1ar0a7f23v11',
      logoPosition: 'bottom-right',
      // interactive: false,
      zoom: 7,
      center: [-2.6986074,54.4651411]
    });

    map.on('load', function(event) {

      // add POIs
      geojson.features.forEach(function(marker) {
        var el = document.createElement('a');
        el.className = 'marker js-open-modal marker--'+marker.properties.tag;
        el.setAttribute("style", "background-image: url('_assets/img/img.jpg')");

          // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setMaxWidth('540px')
          .setHTML('<div class="width width--sm theme--light"><div class="img img--16-9" style="background-image: url(_assets/img/img.jpg);"></div><div class="boxpad--sm"><h4 class="h h--xxxs text--bold">' + marker.properties.title + '</h4><p>' + marker.properties.description + '</p><p><a href="guides/'+marker.properties.country+'/?open-modal='+marker.properties.id+'" class="text--link">Read more</a></p></div>'))
          .addTo(map);
      });

      ///////////// center the map markers within the viewport
      var bounds = new mapboxgl.LngLatBounds();
      function getMapBounds() {
        geojson.features.forEach(function(feature) {
          bounds.extend(feature.geometry.coordinates);
        });
        map.fitBounds(bounds, {padding: 30}); // adds padding so markers aren't on edge
      }
      getMapBounds(); // resets the view when the map loads
      windowResize(getMapBounds); // resets the view after the viewport has finished resizing


      /*===========================
      Reposition map based on selected origin and travel distance
      Coordinates are coming from yml file, output in array in head
      */
      $('.js-distance').on("click",function(){
        var searchOrigin   = $('#step-origin').attr('data-origin');
        var searchDistance = $('#step-distance').attr('data-distance');

        if( searchDistance === "anywhere" ){
          getMapBounds();

        }else{
          var boundsID = searchOrigin + '_' + searchDistance;
          map.fitBounds([
            coords[boundsID]["lat"],
            coords[boundsID]["lng"]
          ], {padding: 30});

        }
      });

      $('.search__window').removeClass('loading');

    });



    /*==============================================================
      ADD SECRET ESCAPES OFFERS TO THE MAP, DIRECT FROM GOOGLE SHEET
    */

    $.ajax({
      type: "GET",
      url: 'https://docs.google.com/spreadsheets/d/1ut5BkYwAYPNyRW-HzvoA2i5mJod1y5d54PMeUtL_0rA/gviz/tq?tqx=out:csv&sheet=Map',
      dataType: "text",
      success: function (csvData) { makeGeoJSON(csvData); }
    });

    function makeGeoJSON(csvData) {
      csv2geojson.csv2geojson(csvData, {
        latfield: 'Latitude',
        lonfield: 'Longitude',
        delimiter: ','
      }, function (err, data) {
        map.on('load', function () {

          //Add the the layer to the map
          data.features.forEach(function(marker) {
            var el = document.createElement('a');
            el.className = 'marker marker--se';

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
              .setLngLat(marker.geometry.coordinates)
              .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
              .setMaxWidth('330px')
              .setHTML('<div class="img img--16-9" style="background-image: url('+marker.properties.LeadImage+');"><a href="'+marker.properties.URL+'" class="img img__link"></a></div><div class="boxpad--sm"><div class="text--smallcaps">'+marker.properties.DestinationName+'</div><h4 class="h h--xxxs text--bold">' + marker.properties.SaleTitle + '</h4><div class="vpad--xs"><p>' + marker.properties.ReasonsToLove + '</p></div><a href="'+marker.properties.URL+'" class="btn btn--xs">View offer</a>'))
              .addTo(map);
          });

        });

      });
    };
  });
};