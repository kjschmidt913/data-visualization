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

//code for axis

xScale = d3.scaleLinear().rangeRound([0, w]),
    yScale = d3.scaleBand().rangeRound([h, 0]).padding(0.1),
    xAxis = d3.axisBottom(xScale),
    yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (h - 5) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(0,0)")
    .call(yAxis);

//end code for axis