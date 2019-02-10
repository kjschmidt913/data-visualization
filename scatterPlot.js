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


var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },

//making graph responsive
default_width = 700 - margin.left - margin.right,
default_height = 500 - margin.top - margin.bottom;
default_ratio = default_width / default_height;

// Determine current size, which determines vars
function set_vars() {
    current_width = window.innerWidth;
    current_height = window.innerHeight;
    current_ratio = current_width / current_height;
    // Check if height is limiting factor
    if (current_ratio > default_ratio) {
        h = default_height;
        w = default_width;
        // Else width is limiting
    } else {
        margin.left = 20
        w = current_width;
        h = w / default_ratio;
    }
    // Set new width and height based on graph dimensions
    width = w - margin.left - margin.right;
    height = h - margin.top - margin.bottom;
};
set_vars();
//end responsive graph code


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

// format the data
data.forEach(function (d) {

    parseDate = d3.timeParse("%Y");
    d.date = parseDate(d.date);
    d.close = +d.close;
});
data.sort(function (a, b) {
    return a.date - b.date;
});

// Scale the range of the data
x.domain(d3.extent(data, function (d) {
    return d.date;
}));
y.domain([0, d3.max(data, function (d) {
    return d.close;
})]);

// Add the valueline path.
svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

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
