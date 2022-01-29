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

const colors = ['#ff0000', '#ffa700', '#ffb900', '#fff400', '#a3ff00', '#2cba00']
const labels = ['90+', '70 - 90', '50 - 70', '30 - 50', '10 - 30', '-10 - 10']

// Color Func
function getColor(d) {
    return d > 90  ? '#ff0000' :
           d > 70  ? '#ffa700' :
           d > 50  ? '#ffb900' :
           d > 30   ? '#fff400' :
           d > 10   ? '#a3ff00' :
           d > -10   ? '#2cba00' :
                      '#2cba00';
};

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
            let depth = feat[i].geometry.coordinates[2];
            let mag = feat[i].properties.mag * 10000;
            let info = `Place: ${feat[i].properties.place}</br>
                        Time: ${feat[i].properties.time}</br>
                        Long,Lat: (${long}, ${lat})</br>
                        Magnitude: ${mag}</br>
                        Depth: ${depth}`;

            // Construct Markers
            let cirMark = L.circle([lat, long], mag, {
                fillColor: getColor(depth),
                color: 'black',
                weight: 1,
                fillOpacity: 0.7
            }).bindPopup(info);

            // Add to Map
            myMap.addLayer(cirMark);

        };

     });

// Add Legend
const legend = L.control({ position: "bottomright" });
legend.onAdd = function() {

    // Create New Div
    const div = L.DomUtil.create("div", "row legend");
    const colorDiv = L.DomUtil.create("div", "column", div);
    const colorDivHTML = [];

    // Loop through Colors
    for (let i = 0; i < 6; i++) {
        colorDivHTML.push("<li style=\"background-color: " + colors[i] + "\"></li>" + labels[i]);
    };

    // Insert into Div
    colorDiv.innerHTML += colorDivHTML.join("</br>");
    return div;
};

// Adding Legend to Map
legend.addTo(myMap);
