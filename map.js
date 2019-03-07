w = 3000;
h = 1250;
var minZoom;
var maxZoom;

var projection = d3
    .geoEquirectangular()
    .center([0, 15])
    .scale([w / (2 * Math.PI)]) // scale to fit group width
    .translate([w / 2, h / 2]); // center in group

var path = d3
    .geoPath()
    .projection(projection);

function zoomed() {
    t = d3
        .event
        .transform;
    countriesGroup.attr(
        "transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
    );
}