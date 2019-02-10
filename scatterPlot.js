var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function (d) {
        return x(d.date);
    })
    .y(function (d) {
        return y(d.close);
    });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
data = [{
    date: 1999,
    close: 32
}, {
    date: 1995,
    close: 15
}, {
    date: 1998,
    close: 3
}, {
    date: 1992,
    close: 22
}, {
    date: 1999,
    close: 50
}, {
    date: 2000,
    close: 43
}]

// format the data
data.forEach(function (d) {

    parseDate = d3.timeParse("%Y");
    d.date = parseDate(d.date);
    d.close = +d.close;
});

// Scale the range of the data
x.domain(d3.extent(data, function (d) {
    return d.date;
}));
y.domain([0, d3.max(data, function (d) {
    return d.close;
})]);

// Add the valueline path.
// svg.append("path")
//     .data([data])
//     .attr("class", "line")
    // .attr("d", valueline);

// Add the scatterplot
svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function (d) {
        return x(d.date);
    })
    .attr("cy", function (d) {
        return y(d.close);
    });

// Add the X Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add the Y Axis
svg.append("g")
    .call(d3.axisLeft(y));
