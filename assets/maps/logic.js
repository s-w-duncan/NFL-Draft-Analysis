// Function to determine marker size based on population
function markerSize(population) {
    return population ;
  }
  
  // An array containing all of the information needed to create city and state markers
  var locations = [
    {
      coordinates: [32.31823, -86.902298],
      state: {
        name: "Alabama",
        population: 9
      }
    },
      
    {
      coordinates: [34.0522, -118.2437],
      state: {
        name: "California",
        population: 30
      }
    },
    {
      coordinates: [41.8781, -87.6298],
      state: {
        name: "Illinois",
        population: 8
      }
    },
  
    {
      coordinates: [66.160507,	-153.369141],
      state: {
        name: "Alaska",
        population: 2
      }
    },
    {
      coordinates: [34.048927, -111.093735],
      state: {
        name: "Arizona",
        population: 0
      }
    },
    {
      coordinates: [34.799999, -92.199997],
      state: {
        name: "Arkansas",
        population: 1
      }
    },
    {
      coordinates: [39.113014, -105.358887],
      state: {
        name: "Colorado",
        population: 6
      }
    },
    {
      coordinates: [41.599998, -72.699997],
      state: {
        name: "Conneticut",
        population: 0
      }
    },
    {
      coordinates: [39.00813, -75.467476],
      state: {
        name: "Deleware",
        population: 1
      }
    },
    {
      coordinates: [27.994402, -81.760254],
      state: {
        name: "Florida",
        population: 22
      }
    },
    {
      coordinates: [33.247875, -83.441162],
      state: {
        name: "Georgia",
        population: 9
      }
    },

    {
      coordinates: [41.2524, -95.9980],
      state: {
        name: "Nebraska",
        population: 3
      }
    },
    {
      coordinates: [19.74176, -155.844437],
      state: {
        name: "Hawaii",
        population: 2
      }
    },
    {
      coordinates: [44.068203, -114.742043],
      state: {
        name: "Idaho",
        population: 1
      }
    },
    {
      coordinates: [40.273502, -86.126976],
      state: {
        name: "Indiana",
        population: 4
      }
    },
    {
      coordinates: [42.032974, -93.581543],
      state: {
        name: "Iowa",
        population: 2
      }
    },
    {
      coordinates: [38.484726, -98.38017],
      state: {
        name: "Kansas",
        population: 1
      }
    },
    {
      coordinates: [37.839333, -84.27002],
      state: {
        name: "Kentucky",
        population: 2
      }
    },
    {
      coordinates: [30.39183, -92.329102],
      state: {
        name: "Louisiana",
        population: 2
      }
    },
    {
      coordinates: [45.367584, -68.972168],
      state: {
        name: "Maine",
        population: 1
      }
    },
    {
      coordinates: [39.045753, -76.641273],
      state: {
        name: "Maryland",
        population: 1
      }
    },
    {
      coordinates: [42.407211, -71.382439],
      state: {
        name: "Massachusetts",
        population: 2
      }
    },
    {
      coordinates: [44.182205, -84.506836],
      state: {
        name: "Michigan",
        population: 7
      }
    },
    {
      coordinates: [46.39241, -94.63623],
      state: {
        name: "Minnesota",
        population: 2
      }
    },
    {
      coordinates: [32.723976, -89.65717],
      state: {
        name: "Mississippi",
        population: 4
      }
    },
    {
      coordinates: [46.96526, -109.533691],
      state: {
        name: "Montana",
        population: 0
      }
    },
    
    {
      coordinates: [39.833851, -74.871826],
      state: {
        name: "New Jersey",
        population: 2
      }
    },
    {
      coordinates: [34.307144, -106.018066],
      state: {
        name: "New Mexico",
        population: 1
      }
    },
    {
      coordinates: [42.937084, -75.6107],
      state: {
        name: "New York",
        population: 6
      }
    },
    {
      coordinates: [35.782169, -80.793457],
      state: {
        name: "North Carolina",
        population: 6
      }
    },
    {
      coordinates: [40.367474, -82.996216],
      state: {
        name: "Ohio",
        population: 12
      }
    },
    {
      coordinates: [36.084621, -96.921387],
      state: {
        name: "Oklahoma",
        population: 6
      }
    },
    {
      coordinates: [43.938812, -120.55859],
      state: {
        name: "Oregon",
        population: 4
      }
    },
    {
      coordinates: [36.084621, -96.921387],
      state: {
        name: "Oklahoma",
        population: 2
      }
    },
    {
      coordinates: [41.203323, -77.194527],
      state: {
        name: "Pennsylvania",
        population: 6
      }
    },
    {
      coordinates: [41.667397, -71.58632],
      state: {
        name: "Rhode Island",
        population: 1
      }
    },
    {
      coordinates: [33.836082, -81.163727],
      state: {
        name: "South Carolina",
        population: 7
      }
    },
    {
      coordinates: [44.436134, -100.23053],
      state: {
        name: "South Dakota",
        population: 1
      }
    },
    {
      coordinates: [35.860119, -86.660156],
      state: {
        name: "Tennessee",
        population: 3
      }
    },
    {
      coordinates: [31.462734, -99.33304],
      state: {
        name: "Texas",
        population: 22
      }
    },
    {
      coordinates: [37.926868, -78.024902],
      state: {
        name: "Virginia",
        population: 11
      }
    },
    {
      coordinates: [47.751076, -120.740135],
      state: {
        name: "Washington State",
        population: 1
      }
    },
    {
      coordinates: [44.64179, -89.73674],
      state: {
        name: "Wisconsin",
        population: 1
      }
    },
  ];
  
  // Define arrays to hold created city and state markers
  var stateMarkers = [];
  
  // Loop through locations and create city and state markers
  for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    stateMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: .5,
        color: "Green",
        fillColor: "Red",
        radius: markerSize(locations[i].state.population * 20000)
      })
    );
  
  }
  
  // Define variables for our base layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  // Create two separate layer groups: one for cities and one for states
  var states = L.layerGroup(stateMarkers);
  // Create a baseMaps object
  var baseMaps = {
    "Dark Map": darkmap,
    "Street Map": streetmap
    
  };
  
  // Create an overlay object
  var overlayMaps = {
    "Draftee Birth States": states,
  };
  
  // Define a map object
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4.25,
    layers: [darkmap, states]
  });
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  