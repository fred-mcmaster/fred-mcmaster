    // function display_markers(json_object)
    // {
    //   clear_markers();
    //   //console.log(json_object);
    //     for (let i = 0; i < json_object.features.length; i++)
    //     {
    //       new_marker = new google.maps.Marker({ 
    //         position: {lat: parseFloat(json_object.features[i].properties.LATITUDE), 
    //                    lng: parseFloat(json_object.features[i].properties.LONGITUDE)},
    //         title: json_object.features[i].properties.NAME
    //       });
    //       new_marker.setMap(map);
    //       new_marker.NAME = json_object.features[i].properties.NAME;
    //       //new_marker.CATEGORY = hospitals.features[i].properties.CATEGORY;
    //       new_marker.addListener("click", marker_clicked);
    //       markers.push(new_marker);
    //     }
    // }