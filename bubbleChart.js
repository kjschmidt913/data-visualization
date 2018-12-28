dataset = {
    "children": [{
            "state": "Alabama",
            "population": 4887871
        },
        {
            "state": "Alaska",
            "population": 737438
        },
        {
            "state": "Arizona",
            "population": 7171646
        },
        {
            "state": "Arkansas",
            "population": 3013825
        },
        {
            "state": "California",
            "population": 39557045
        },
        {
            "state": "Colorado",
            "population": 5695564
        },
        {
            "state": "Connecticut",
            "population": 3572665
        },
        {
            "state": "Delaware",
            "population": 967171
        },
        {
            "state": "District of Columbia",
            "population": 702455
        },
        {
            "state": "Florida",
            "population": 21299325
        },
        {
            "state": "Georgia",
            "population": 10519475
        },
        {
            "state": "Hawaii",
            "population": 1420491
        },
        {
            "state": "Idaho",
            "population": 1754208
        },
        {
            "state": "Illinois",
            "population": 12741080
        },
        {
            "state": "Indiana",
            "population": 6691878
        },
        {
            "state": "Iowa",
            "population": 3156145
        },
        {
            "state": "Kansas",
            "population": 2911505
        },
        {
            "state": "Kentucky",
            "population": 4468402
        },
        {
            "state": "Louisiana",
            "population": 4659978
        },
        {
            "state": "Maine",
            "population": 1338404
        },
        {
            "state": "Maryland",
            "population": 6042718
        },
        {
            "state": "Massachusetts",
            "population": 6902149
        },
        {
            "state": "Michigan",
            "population": 9995915
        },
        {
            "state": "Minnesota",
            "population": 5611179
        },
        {
            "state": "Mississippi",
            "population": 2986530
        },
        {
            "state": "Missouri",
            "population": 6126452
        },
        {
            "state": "Montana",
            "population": 1062305
        },
        {
            "state": "Nebraska",
            "population": 1929268
        },
        {
            "state": "Nevada",
            "population": 3034392
        },
        {
            "state": "New Hampshire",
            "population": 1356458
        },
        {
            "state": "New Jersey",
            "population": 8908520
        },
        {
            "state": "New Mexico",
            "population": 2095428
        },
        {
            "state": "New York",
            "population": 19542209
        },
        {
            "state": "North Carolina",
            "population": 10383620
        },
        {
            "state": "North Dakota",
            "population": 760077
        },
        {
            "state": "Ohio",
            "population": 11689442
        },
        {
            "state": "Oklahoma",
            "population": 3943079
        },
        {
            "state": "Oregon",
            "population": 4190713
        },
        {
            "state": "Pennsylvania",
            "population": 12807060
        },
        {
            "state": "Rhode Island",
            "population": 1057315
        },
        {
            "state": "South Carolina",
            "population": 5084127
        },
        {
            "state": "South Dakota",
            "population": 882235
        },
        {
            "state": "Tennessee",
            "population": 6770010
        },
        {
            "state": "Texas",
            "population": 28701845
        },
        {
            "state": "Utah",
            "population": 3161105
        },
        {
            "state": "Vermont",
            "population": 626299
        },
        {
            "state": "Virginia",
            "population": 8517685
        },
        {
            "state": "Washington",
            "population": 7535591
        },
        {
            "state": "West Virginia",
            "population": 1805832
        },
        {
            "state": "Wisconsin",
            "population": 5813568
        },
        {
            "state": "Wyoming",
            "population": 577737
        }
    ]
};

var diameter = 900;
var color = d3.scaleOrdinal(d3.schemeCategory20b);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(.5);

var svg = d3.select("#bubble")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function (d) {
        return d.population;
    });


var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
        return !d.children
    })
    .append("g")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr('opacity', '.8');
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr('opacity', '1');
    })
    .attr("class", "node")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function (d) {
        return d.state;
    });

node.append("circle")
    .attr("r", function (d) {
        return d.r;
    })
    .style("fill", function (d, i) {
        return color(i);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function (d) {
        return d.data.state;
    })
    .attr("font-size", function (d) {
        return d.r / 5;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function (d) {
        return d.data.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    })
    .attr("font-size", function (d) {
        return d.r / 5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");