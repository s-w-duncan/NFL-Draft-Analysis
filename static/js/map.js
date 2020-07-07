function createMap(collegeLocations) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: "pk.eyJ1Ijoia2VuZzg1IiwiYSI6ImNrYmR5ajhiMDBhaGEyeHFxZjd1NjZ0cDgifQ.UrvAKjvUV8fhJq4oIBSwaw"
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Colleges": collegeLocations
    };
  
    // Create the map object with options
    var map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [lightmap, collegeLocations]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property off of response.data
    var name = response.data.name;
    // var address = response.data.address
    // var lat = response.data.lat
    // var lng = response.data.lng
  
    // Initialize an array to hold bike markers
    var collegeMarkers = [];
  
    // Loop through the  array
    for (var index = 0; index < name.length; index++) {
      var collegeName = name[index];
  
      // For each station, create a marker and bind a popup with the station's name
      var collegeMarker = L.marker([collegeName.lat, collegeName.lng])
        .bindPopup("<h3>" + collegeName.name + "<h3><h3>Address: " + collegeName.address + "</h3>");
  
      // Add the marker to the bikeMarkers array
      collegeMarkers.push(collegeMarker);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(collegeMarkers));
  }

  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("./data/colleges.json", createMarkers);
  