var dataset = [{
        title: "title one",
        value: 74
    },
    {
        title: "title two",
        value: 85
    },
    {
        title: "title 3",
        value: 840
    },
    {
        title: "title 4",
        value: 4345
    },
    {
        title: "title 5",
        value: 300
    },
    {
        title: "title 6",
        value: 2000
    },
];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20b);

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

var legendRectSize = 18;
var legendSpacing = 4;

var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
        return color(d.data.title);

    });

// path.on('mouseover', function (d) {
//     var total = d3.sum(dataset.map(function (d) {
//         return d.value;
//     }));
//     var percent = Math.round(1000 * d.data.value / total) / 10;
//     tooltip.select('.label').html(d.data.title);
//     tooltip.select('.count').html(d.data.value);
//     tooltip.select('.percent').html(percent + '%');
//     tooltip.style('display', 'block');
// });

// path.on('mouseout', function () {
//     tooltip.style('display', 'none');
// });

var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = height * color.domain().length / 2;
        var horz = -2 * legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', color)
    .style('stroke', color);

legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
        return d;
    });