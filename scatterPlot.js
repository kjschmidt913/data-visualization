data = [{
    date: 2009,
    close: 7.25
}, {
    date: 2008,
    close: 6.55
}, {
    date: 2007,
    close: 5.85
}, {
    date: 1997,
    close: 5.15
}, {
    date: 1996,
    close: 4.75
}, {
    date: 1991,
    close: 4.25
}, {
    date: 1981,
    close: 3.35
}, {
    date: 1980,
    close: 3.10
}, {
    date: 1979,
    close: 2.90
}, {
    date: 1978,
    close: 2.65
}]

var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
}

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//making graph responsive
default_width = 700 - margin.left - margin.right,
    default_height = 500 - margin.top - margin.bottom;
default_ratio = default_width / default_height;

// Determine current size, which determines vars
function set_vars() {
    current_width = window.innerWidth;
    current_height = window.innerHeight;
    current_ratio = current_width / current_height;
    // Check if height is limiting factor/ desktop
    if (current_ratio > default_ratio) {
        h = default_height;
        w = default_width;
        // Else width is limiting / mobile
    } else {
        margin.left = 20
        w = current_width;
        h = w / default_ratio;
    }
    // Set new width and height based on graph dimensions
    width = w - 50 - margin.right;
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

// append the svg object to the body of the page
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
//sort the data by date so the trend line makes sense
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

// Add the trendline
svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

// Add the data points
svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function (d) {
        return x(d.date);
    })
    .attr("cy", function (d) {
        return y(d.close);
    })
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('200')
            .attr('opacity', '.7');
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html(d.close)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('200')
            .attr('opacity', '1');
        div.transition()
            .duration('200')
            .style("opacity", 0);
    });

// Add the axis
if (width<500){
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));
} else{
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
}

svg.append("g")
    .call(d3.axisLeft(y));