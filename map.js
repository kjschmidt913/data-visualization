w = 3000;
h = 1250;

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
function zoomed() {
    t = d3
        .event
        .transform;
    countriesGroup.attr(
        "transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
    );
}
var zoom = d3
    .zoom()
    .on("zoom", zoomed);

function getTextBox(selection) {
    selection.each(function (d) {
        d.bbox = this.getBBox();
    });
}
var svg = d3
    .select("#map-holder")
    .append("svg")
    .attr("width", $("#map-holder").width())
    .attr("height", $("#map-holder").height())
    .call(zoom);