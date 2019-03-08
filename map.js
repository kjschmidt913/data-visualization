// https://medium.com/@andybarefoot/making-a-map-using-d3-js-8aa3637304ee

w = 3000;
h = 1250;
var minZoom;
var maxZoom;

var projection = d3.geoEquirectangular()
    .center([0, 15])
    .scale([w / (2 * Math.PI)]) // scale to fit group width
    .translate([w / 2, h / 2]); // center in group

var path = d3
    .geoPath()
    .projection(projection);

function zoomed() {
    t = d3.event
        .transform;
    countriesGroup.attr(
        "transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
    );
}

var zoom = d3.zoom()
    .on("zoom", zoomed);

function getTextBox(selection) {
    selection.each(function (d) {
        d.bbox = this.getBBox();
    });
}

var svg = d3
    .select("#map")
    .append("svg")
    .attr("width", $("#map").width())
    .attr("height", $("#map").height())
    .call(zoom);

// get map data
d3.json(
    "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json",
    function (json) {

    }
);

countriesGroup = svg
    .append("g")
    .attr("id", "map");

countriesGroup
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", h);