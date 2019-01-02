var totals = [{
        title: "Soft-serve",
        value: 286,
        all: 1098
    },
    {
        title: "Scooped",
        value: 472,
        all: 1098
    },
    {
        title: "No Preference",
        value: 318,
        all: 1098
    },
    {
        title: "Not Sure",
        value: 22,
        all: 1098
    }
];


//female
var femaleData = [{
        title: "Soft-serve",
        value: 25,
        all: 100
    },
    {
        title: "Scooped",
        value: 44,
        all: 100
    },
    {
        title: "No Preference",
        value: 28,
        all: 100
    },
    {
        title: "Not Sure",
        value: 3,
        all: 100
    }
];

//male

var maleData = [{
        title: "Soft-serve",
        value: 27,
        all: 100
    },
    {
        title: "Scooped",
        value: 42,
        all: 100
    },
    {
        title: "No Preference",
        value: 30,
        all: 100
    },
    {
        title: "Not Sure",
        value: 2,
        all: 100
    }
];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var svg = d3.select('#donut')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');

var donutWidth = 75;

var arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })
    .sort(null);

var legendRectSize = 13;
var legendSpacing = 7;

var div = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0);

var path = svg.selectAll('path')
    .data(pie(totals))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
        return color(d.data.title);
    })
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.95');
        div.transition()
            .duration(50)
            .style("opacity", 1);
        let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
        div.html(num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");

    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
        div.transition()
            .duration('50')
            .style("opacity", 0);
    });


var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'circle-legend')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = height * color.domain().length / 2;
        var horz = -2 * legendRectSize - 13;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('circle')
    .style('fill', color)
    .style('stroke', color)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', '.5rem');

legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
        return d;
    });

function change(data) {
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })(data);

    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;

    path = d3.select("#donut")
        .selectAll("path")
        .data(pie); // Compute the new angles
    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    path.attr("d", arc);// redrawing the path

}

d3.select("button#a")
    .on("click", function () {
        change(totals);
    })
d3.select("button#b")
    .on("click", function () {
        change(femaleData);
    })
d3.select("button#c")
    .on("click", function () {
        change(maleData)
    })