// API Endpoint
const queryURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Creating the map object
var myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 5
});
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Get Latest Data
d3.json(queryURL)
    .then(res => { 

        // Get Features
        feat = res.features;

        // Loop through Data
        for (let i = 0; i < feat.length; i++) {

            // Current Data
            let long = feat[i].geometry.coordinates[0];
            let lat = feat[i].geometry.coordinates[1];
            let elev = feat[i].geometry.coordinates[2];
            let mag = feat[i].properties.mag * 10000;

            // Construct Markers
            let cirMark = L.circle([lat, long], mag, {
                fillcolor: '#f03'
            });

            // Add to Map
            myMap.addLayer(cirMark);

        };

     });

// // FUNCTION: Create Features
// function createFeat(data) {

//     // FUNCTION: Each Feature
//     function onEachFeature(feat, layer) {
//         layer.bindPopup(`<h3>${feat.properties.place}</h3><hr><p>${new Date(feat.properties.time)}</p>`);
//     };

//     // Create Layers
//     const earthquakes = L.geoJSON(data, { onEachFeature: onEachFeature });

//     // Construct Map
//     createMap(earthquakes);
// };

// function createMap(data) {

//     // Base Layers
//     const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });

//     const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//         attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//     });

//     // BaseMap Obj
//     const baseMap = {
//         "Street Map": street,
//         "Topography Map": topo
//     };

//     // Overlay Obj
//     const overlayMap = {
//         Earthquakes: data
//     };

//     // Construct Map
//     const mainMap = L.map("map", {
//         center: [37.09, -95.71],
//         zoom: 5,
//         layers: [street, data]      
//     });

//     // Layer Control
//     L.control.layers(baseMap, overlayMap, {
//         collapsed: false
//       }).addTo(mainMap);
    
// };