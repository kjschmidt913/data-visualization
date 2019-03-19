w = 3000;
h = 1250;
// variables for catching min and max zoom factors
var minZoom;
var maxZoom;

var projection = d3
    .geoEquirectangular()
    .center([0, 15])
    .scale([w / (2 * Math.PI)])
    .translate([w / 2, h / 2]);


var path = d3
    .geoPath()
    .projection(projection);