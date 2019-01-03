//18-24
var group1 = [{
        title: "Strongly Like",
        value: 22
    },
    {
        title: "Somewhat Like",
        value: 35
    },
    {
        title: "Somewhat Dislike",
        value: 15
    },
    {
        title: "Strongly Dislike",
        value: 16
    },
    {
        title: "Other/Not Sure",
        value: 12
    }
];

//25-34
var group2 = [{
        title: "Strongly Like",
        value: 25
    },
    {
        title: "Somewhat Like",
        value: 39
    },
    {
        title: "Somewhat Dislike",
        value: 14
    },
    {
        title: "Strongly Dislike",
        value: 15
    },
    {
        title: "Other/Not Sure",
        value: 7
    }
];

//35-44
var group3 = [{
        title: "Strongly Like",
        value: 30
    },
    {
        title: "Somewhat Like",
        value: 40
    },
    {
        title: "Somewhat Dislike",
        value: 12
    },
    {
        title: "Strongly Dislike",
        value: 12
    },
    {
        title: "Other/Not Sure",
        value: 6
    }
];
//45-55
var group4 = [{
        title: "Strongly Like",
        value: 39
    },
    {
        title: "Somewhat Like",
        value: 39
    },
    {
        title: "Somewhat Dislike",
        value: 9
    },
    {
        title: "Strongly Dislike",
        value: 9
    },
    {
        title: "Other/Not Sure",
        value: 4
    }
];
//55+
var group5 = [{
        title: "Strongly Like",
        value: 39
    },
    {
        title: "Somewhat Like",
        value: 42
    },
    {
        title: "Somewhat Dislike",
        value: 10
    },
    {
        title: "Strongly Dislike",
        value: 7
    },
    {
        title: "Other/Not Sure",
        value: 2
    }
];

var width = 600,
    height = 300,
    radius = Math.min(width, height) / 2;

// var color = d3.scaleOrdinal()
//     .range(["#2C93E8", "#838690", "#F56C4E"]);
var color = d3.scaleOrdinal(d3.schemeCategory20c);

var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })(group1);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var svg = d3.select("#pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var g = svg.selectAll("arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.95');
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
    })
    .attr('transform', 'translate(-100, 0)');

g.append("path")
    .attr("d", arc)
    .style("fill", function (d) {
        return color(d.data.title);
    });

svg.append('g')
    .attr('class', 'legend')
    .selectAll('text')
    .data(group1)
    .enter()
    .append('text')
    .text(function (d) {
        return '• ' + d.title;
    })
    .attr('fill', function (d) {
        return color(d.title);
    })
    .attr('y', function (d, i) {
        return 19 * (i -2);
    })
    .attr('x', 55)

function changeData(data) {
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })(data);

    path = d3.select("#pie")
        .selectAll("path")
        .data(pie); // Compute the new angles
    path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition
}

d3.select("button#group1")
    .on("click", function () {
        changeData(group1);
    })
d3.select("button#group2")
    .on("click", function () {
        changeData(group2);
    })
d3.select("button#group3")
    .on("click", function () {
        changeData(group3)
    })
d3.select("button#group4")
    .on("click", function () {
        changeData(group4)
    })
d3.select("button#group5")
    .on("click", function () {
        changeData(group5)
    })