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

    //non functional code for axis
    margin = {
        top: 20,
        right: 40,
        bottom: 30,
        left: 40
    },

    xScale = d3.scaleLinear().rangeRound([0, w]),
    yScale = d3.scaleBand().rangeRound([h, 0]).padding(0.1),
    xAxis = d3.axisBottom(xScale),
    yAxis = d3.axisLeft(yScale),
    svg = d3.select("#" + domEle).append("svg")
    .attr("width", 1000 + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //end code for axis

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