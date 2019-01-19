var w = 600;
var h = 300;

var dataset = [
    [256, 20],
    [480, 270],
    [250, 150],
    [100, 99],
    [330, 285],
    [410, 36],
    [475, 132],
    [25, 180],
    [85, 63],
    [220, 240]
];

//Create SVG element
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return d[0];
    })
    .attr("cy", function (d) {
        return d[1];
    })
    .attr("r", function (d) {
        return Math.sqrt(h - d[1]);
    })
    .attr("fill", "#00aa88");

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
        return d[0] + "," + d[1];
    })
    .attr("x", function (d) {
        return d[0];
    })
    .attr("y", function (d) {
        return d[1];
    })
    .attr("font-size", "15px")
    .attr("fill", "black");
