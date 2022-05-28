  $(document).ready(function()
  {

    function showError() {

      $("#error").addClass("alert-warning");
      $("#error").html("Error: Location could not be found.");
      
      setTimeout(function(){
        $("#error").removeClass("alert-warning");
         $("#error").html("");
      },5000)
    }

    function foundPosition(position)
    {
      const image =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  
      new_marker = new google.maps.Marker({ 
        position: {lat: position.coords.latitude, 
                    lng: position.coords.longitude},
        title: "Your Position",
        icon: image
      });
      new_marker.setMap(map);
      new_marker.addListener("click", function(){
          infowindow.close();
          infowindow.setContent("Latitude: " + position.coords.latitude + 
          "<br /> Longitude: " + position.coords.longitude);
          infowindow.open(map, new_marker);
          //map.setCenter({lat: position.coords.latitude, 
          //  lng: position.coords.longitude});
      });
      markers.push(new_marker);
      
    }

    function geolocate()
    {
      navigator.geolocation.getCurrentPosition( foundPosition, showError );
    }

    $("#geolocate").click(geolocate);

  });

  //markers array
  var markers = [];

  function initMap()
  {
      map = new google.maps.Map(document.getElementById("map"), 
                                {
                                center: { lat: 43.25193, lng: -79.8302},
                                zoom: 12,
                                });

      infowindow = new google.maps.InfoWindow();   
  }

  //clear button function 
  function clear_markers()
  {    
      for (let i = 0; i < markers.length; i++)
        {
          markers[i].setMap(null);
        }
  }

  marker_clicked = function()
  {
    infowindow.close();
    infowindow.setContent(this.NAME);
    infowindow.open(map, this);
  }

  //display hospital markers 
  $("#hospital").click(function(){
    clear_markers();
    for (let i = 0; i < hospitals.features.length; i++)
    {
      new_marker = new google.maps.Marker({ 
        position: {lat: parseFloat(hospitals.features[i].properties.LATITUDE), 
                    lng: parseFloat(hospitals.features[i].properties.LONGITUDE)},
        title: hospitals.features[i].properties.NAME
      });
      new_marker.setMap(map);
      new_marker.NAME = hospitals.features[i].properties.NAME;
      new_marker.addListener("click", marker_clicked);
      markers.push(new_marker);
    }
  })

  //display fire station markers 
  $("#fire_station").click(function(){
    clear_markers();
    for (let i = 0; i < fire_stations.features.length; i++)
    {  
      new_marker = new google.maps.Marker({ 
        position: {lat: parseFloat(fire_stations.features[i].properties.LATITUDE), 
                    lng: parseFloat(fire_stations.features[i].properties.LONGITUDE)},
        title: fire_stations.features[i].properties.NAME
      });
      new_marker.setMap(map);
      new_marker.NAME = fire_stations.features[i].properties.NAME;
      new_marker.addListener("click", marker_clicked);
      markers.push(new_marker);
    }
  })

  //display schools markers 
  $("#school").click(function(){
    clear_markers();
    for (let i = 0; i < schools.features.length; i++)
    {
      new_marker = new google.maps.Marker({ 
        position: {lat: parseFloat(schools.features[i].properties.LATITUDE), 
                    lng: parseFloat(schools.features[i].properties.LONGITUDE)},
        title: schools.features[i].properties.NAME
      });
      new_marker.setMap(map);  
      new_marker.NAME = schools.features[i].properties.NAME;
      new_marker.addListener("click", marker_clicked);
      markers.push(new_marker);
    }
  })

  //display waterfalls markers 
  $("#waterfall").click(function(){
    clear_markers();
    for (let i = 0; i < waterfalls.features.length; i++)
    {
      new_marker = new google.maps.Marker({ 
        position: {lat: parseFloat(waterfalls.features[i].properties.LATITUDE), 
                    lng: parseFloat(waterfalls.features[i].properties.LONGITUDE)},
        title: waterfalls.features[i].properties.NAME
      });
      new_marker.setMap(map); 
      new_marker.NAME = waterfalls.features[i].properties.NAME;
      new_marker.addListener("click", marker_clicked); 
      markers.push(new_marker);
    }
  })

  $("#clear").click(clear_markers);