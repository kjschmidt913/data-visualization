var w = 600;
var h = 300;

var dataset = [
    [1999, 20],
    [2000, 270],
    [2001, 150],
    [2002, 99],
    [2003, 285],
    [1999, 36],
    [2001, 132],
    [2002, 180],
    [1999, 63],
    [2000, 240]
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
parseDate = d3.timeParse("%Y");

xScale = d3.scaleLinear().rangeRound([0, w]),
    yScale = d3.scaleBand().rangeRound([h, 0]).padding(0.1),
    xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"))
    yAxis = d3.axisLeft(yScale);

    xScale.domain(data.map(function (d) {
        return parseDate(d[0]);
    }));
    
    
    //x max
    // xScale.domain([0, d3.max(data[0])]).nice();

svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (h - 5) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(0,0)")
    .call(yAxis);


//end code for axis