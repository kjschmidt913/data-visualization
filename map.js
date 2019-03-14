// https://medium.com/@andybarefoot/making-a-map-using-d3-js-8aa3637304ee

w = 3000;
h = 1250;
var minZoom;
var maxZoom;

var projection = d3.geoEquirectangular()
    .center([0, 15])
    .scale([w / (2 * Math.PI)]) // scale to fit group width
    .translate([w / 2, h / 2]); // center in group

var path = d3
    .geoPath()
    .projection(projection);

function zoomed() {
    t = d3.event
        .transform;
    countriesGroup.attr(
        "transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
    );
}

var zoom = d3.zoom()
    .on("zoom", zoomed);

function getTextBox(selection) {
    selection.each(function (d) {
        d.bbox = this.getBBox();
    });
}

var svg = d3
    .select("#map")
    .append("svg")
    .attr("width", $("#map").width())
    .attr("height", $("#map").height())
    .call(zoom);

// get map data
d3.json(
    "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json",
    function (json) {

    }
);

countriesGroup = svg
    .append("g")
    .attr("id", "map");

countriesGroup
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", h);

countries = countriesGroup
    .selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("id", function (d, i) {
        return "country" + d.properties.iso_a3;
    })
    .attr("class", "country")

    .on("mouseover", function (d, i) {
        d3.select("#countryLabel" + d.properties.iso_a3).style("display", "block");
    })
    .on("mouseout", function (d, i) {
        d3.select("#countryLabel" + d.properties.iso_a3).style("display", "none");
    })

    .on("click", function (d, i) {
        d3.selectAll(".country").classed("country-on", false);
        d3.select(this).classed("country-on", true);
        boxZoom(path.bounds(d), path.centroid(d), 20);
    });

Homepage
Making a map using D3.js
Go to the profile of Andy Barefoot
Andy Barefoot
May 28, 2017
Mike Bostock’ s(@mbostock) D3.js library makes use of SVG, HTML5 and CSS standards to create interactive data visualisations
for the web.He has hundreds of examples of amazing visualisations created using this library.

I’ ve been using the library to make some data visualisations of my own and as part of this I wanted to create a simple and reusable world map template.The idea is that I will be able to use this standard map as a base
for future visualisations so it should be possible to customise it very easily.

You can play with the completed map and see the code on Codepen.Below I describe how it was coded and how the various functionalities were achieved.


Design and UX
Before we get to the code we need to make some decisions on how our map will look and behave.

Firstly we’ ll define the functionality:

    I want a world map showing each country with a visible border.
The name of each country should be displayed on mouse over.
On click the country is highlighted and the view zooms so that the country fills the view.
The display of the map should be“ responsive” so that it can easily be resized without breaking the appearance or functionality.
The appearance of the map should be defined in a simple CSS file to make re - skinning as easy as possible.
The map should support“ standard” zoom functionality as follows:

    The user will be able to zoom in by double clicking on the map and zoom out by pressing shift whilst double clicking.
Similarly the user can zoom in or out by pinching on the trackpad.
The user can also pan the map by clicking and dragging.
In addition, as described above the map will zoom in on a particular country when the user clicks on that country.
We will also define some limits on the zoom / pan functionality:

    The limits of “zoom out” are set by the size of the view.It will not be possible to zoom out so much that the map is smaller than the view.
Similarly the pan will be restricted so that the map can’ t be moved beyond the edges of the view.
We will set an arbitrary maximum zoom.
And
finally some
default behaviour:

    When the map first loads it will be displayed at the minimum possible zoom so as many countries as possible are displayed.
On load it will also automatically centre the map within the view.
Geographical Data
Now
let’ s find some map data to use.The Natural Earth site provides public domain maps and @AshKyd has created a simple interface that allows you to download the data in GeoJSON format having customised it first.It allows you to specify the countries you wish to include either individually or by region and choose from 3 levels of detail.

I have selected all regions and the medium level of detail and downloaded the resultant 4 MB JSON file.


Map Projection
Finally before we start any actual coding we must choose a projection.Projections are the way in which the spherical geometry of a globe is displayed in 2 D and the D3 library allows you to use a variety of different map projections.

There are obvious difficulties in “unpeeling” a sphere into a single 2 D shape and different projections have different advantages and disadvantages but
for this exercise we will use a cylindrical projection, specifically the Equi - Rectangular projection as shown below.


The Equi - Rectangular projection.
The disadvantage of this projection is that the countries further from the equator appear proportionally larger than those closer to the equator as the lines of longitude are stretched to the same length.If my data visualisation was concerned with accurately comparing country size or distances between points then this would be an issue.

However I’ m looking
for something simple and visually pleasing and this projection provides a rectangular map, ideal
for displaying on rectangular screens whether we use the full screen or a rectangular portion of the screen.

Looking at the projection it’ s clear that Antartica is taking up a lot of the space.As the visualisations I have in mind rarely feature Antartica and as I have already made some compromises regarding accuracy I have decided to crop Antartica from my map.

The projection as displayed above shows the lines of latitude and longitude every 10 degrees, and it looks like the 60 degree South line sits nicely between the tip of South America and Antartica.I will crop below this line effectively removing the bottom three rows from the map.

This means that the width to height ratio of the map has changed from 2: 1(36: 18) to 12: 5(36: 15) and the centre of the map is now 15 degrees north of the Equator.


The desired area of the projection showing the new centre.
Now we have decided on a projection it is a good time to define the overall size of our map.Although we will almost always be displaying it cropped within a smaller view we need to define the size it would be
if fully visible and at a zoom factor of 1.

As we have a width to height ratio of 12: 5 I will choose map dimensions of 3000 pixels by 1250 pixels.These values conform to the required ratio whilst considering a maximum likely size
for the user’ s view port.

HTML
Now we are ready to start coding.The general approach is as follows.

We will define a html div that will hold an SVG.The map will be drawn as a large group of paths in the SVG.We will dynamically set the size of the SVG to match the div so that we can use our usual responsive design techniques to control the size / location of the div.Whenever the div is resized we will make sure the SVG and map are refreshed so that they still display correctly.

As most of the elements will be generated dynamically the HTML couldn’ t be simpler, we’ re just going to create a div.The zoom functionality as described above will operate within this div so that we can easily change the size of the map and the zoom functionality will adapt appropriately.

    <
    div id = "map-holder" > < /div>
CSS
Next we’ ll set up the CSS.Normally I would add this as we go along defining each class as we define them in the JavaScript.However I’ m going to show it all up front here.

For this example I’ ve set the newly created“ map - holder” div to be the full width and height of the screen.

body {
    margin: 0;
    background - color: #2A2C39;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-weight: 200;
  font-size: 17px;
}
# map - holder {
        width: 100 vw;
        height: 100 vh;
    }
    svg rect {
        fill: #2A2C39;   /* map background colour */
}
.country{
  fill: # d0d0d0; /* country colour */
        stroke: #2A2C39; /* country border colour */
  stroke-width: 1; /* country border width */
}
.country-on{
  fill: # 4 B5358; /* highlight colour for selected country */
    }
    .countryLabel {
        display: none; /* hide all country labels by default */
    }
    .countryName {
        fill: #FFFAFF; /* country label text colour */
    }
    .countryLabelBg {
        fill: #30BCED;   /* country label background colour */
}
Here is an image of our colour scheme. The CSS allows us to easily change this whenever we like.


Our CSS sets a few display colours and defines text appearance.
JavaScript
As well as the code detailed below we will will use the D3 and jQuery libraries.

https://cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js
https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
Variables
Then before we get to actually drawing anything we are going to set up some variables.

We store the values we decided above for the width and height of the map as w and h.

Next we’ll create a couple of values to hold the maximum and minimum zoom factors. We’ll calculate these later but they will be used to stop the user either zooming in too far or decreasing the size of the map to smaller than the surrounding container.

// DEFINE VARIABLES
// Define size of map group
// Full world map is 2:1 ratio
// Using 12:5 because we will crop top and bottom of map
w = 3000;
        h = 1250;
        // variables for catching min and max zoom factors
        var minZoom;
        var maxZoom;
        Projection
        Next we will define the projection we want to use in D3.

        We specify the Equi - Rectangular projection we decided upon as well as defining the centre,
        scale and translation of the projection.

        The desired centre of the projection is 15 degrees north of the Equator as described earlier.

        The scale requires a value in pixels per radian.This is our previously defined width of our map image(w) divided by the total angular circumference of the world(360 degrees, which is 2 Pi radians).

        The translation of the projection defines the pixel position on our map of the centre of our projection.As we want our defined centre of the projection to align with the centre of the map we use w / 2 and h / 2.

        // Define map projection
        var projection = d3
            .geoEquirectangular()
            .center([0, 15]) // set centre to further North
            .scale([w / (2 * Math.PI)]) // scale to fit group width
            .translate([w / 2, h / 2]) // ensure centred in group
        ;
        Having set up our projection we can use it in the D3“ geoPath” generator which takes a defined projection and creates a SVG path data string.

        Later we can use this to generate the full“ d” value which defines the shape of paths
        for each country as we add them to the map.As this image below shows less than half of a typical“ d” value this is definitely going to be useful.


        Just part of the“ d” string that defines the shape of a single country outline
        // Define map path
        var path = d3
            .geoPath()
            .projection(projection);
        Zoom
        Next we will define a
        function that applies a zoom and translation to our map.

        Within the“ zoomed”
        function we listen
        for the transform event caused by the zoom interaction and
        return the pan(x, y) and zoom(k) values.

        These are then assigned as a“ transform” attribute to our SVG group“ countriesGroup”(not yet defined) containing all our map vectors,
        labels and text.

        // apply zoom to countriesGroup
        function zoomed() {
            t = d3
                .event
                .transform;
            countriesGroup.attr(
                "transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
            );
        }
        D3 supports as standard pan and zoom functionality and interaction such as click - and - drag to pan,
        spin the wheel to zoom,
        or touch.It is very simple to define a new zoom behaviour and use our new“ zoomed”
        function as the action
        for this behaviour.

        // Define map zoom behaviour
        var zoom = d3
        .zoom()
        .on("zoom", zoomed);
        Finally we define a
        function that will create an object“ bbox” that contains the bounding box of a selected object.We will use this later to define the size of text.

        function getTextBox(selection) {
            selection.each(function (d) {
                d.bbox = this.getBBox();
            });
        }
        Drawing the Map
        Now we are ready to start actually drawing our map.

        The SVG is created using D3 and given the same width and height as the containing div.We use jQuery to
        return the dimensions of the div.

        var svg = d3
        .select("#map-holder")
        .append("svg")
        // set to the same size as the "map-holder" div
        .attr("width", $("#map-holder").width())
        .attr("height", $("#map-holder").height())
        // add zoom functionality
        .call(zoom);
        We are now at the stage where we will load in our map data and draw the map into our SVG.We use D3.json to load our data and define the functionality that will parse this data.

        My Codepen uses data hosted on GitHub,
        you should obviously use the local GeoJSON file you downloaded earlier.

        // get map data
        d3.json(
            "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json",
            function (json) {
                /////////////////////////////////////////////
                //////// Here we will put a lot of code concerned
                //////// with drawing the map. This will be defined
                //////// in the next sections.
                /////////////////////////////////////////////
            }
        );
        Although the SVG is only the size of its containing div,
        the map itself will contain even those countries not displayed and therefore needs to be the size we calculated when choosing the projection.

        First we create a group(as referenced in our“ zoomed”
            function) called“ countriesGroup”.This will contain every part of the map.The first part of which is a background rectangle the size of the map.

        countriesGroup = svg
        .append("g")
        .attr("id", "map");
        // add a background rectangle
        countriesGroup
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", h);
        Now we need to attach the data and draw a path
        for every country in the JSON.Within the JSON each country is defined as a separate“ feature” so we bind“ json.features” to countriesGroup and create a path
        for each feature.

        The GeoJSON contains various data
        for each country which we can use.We use the ISO country code to create a unique ID
        for each path.

        This is also where we use our previously defined“ path” to
        return the very long“ d” string that defines the shape of each country.

        On each path we also add mouseover / out functionality that will either show or hide the yet to be created name label
        for each country.

        Finally we add click functionality that will add a class to the country clicked,
        having first ensured it is removed from all countries.We’ ll use this class to change the colour of the country via CSS.It also calls a
        function“ boxZoom” we have yet to define that takes the bounding box and central point of the country and zooms in to show that country.We will define this“ boxZoom”
        function later.

        // draw a path for each feature/country
        countries = countriesGroup
        .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", function (d, i) {
            return "country" + d.properties.iso_a3;
        })
        .attr("class", "country")
        // add a mouseover action to show name label for feature/country
        .on("mouseover", function (d, i) {
            d3.select("#countryLabel" + d.properties.iso_a3).style("display", "block");
        })
        .on("mouseout", function (d, i) {
            d3.select("#countryLabel" + d.properties.iso_a3).style("display", "none");
        })
        // add an onclick action to zoom into clicked country
        .on("click", function (d, i) {
            d3.selectAll(".country").classed("country-on", false);
            d3.select(this).classed("country-on", true);
            boxZoom(path.bounds(d), path.centroid(d), 20);
        });
        Now we will add a label to each country starting with a group to hold a background rectangle and the text displaying the country name.

        Again we use the ISO code to give each label a unique ID.

        We position the labels on the centroid of the country.This is provided in the GeoJSON data and defines the“ centre of mass” of each country.In most cases this means the label will be nicely located in the middle of the country on the map but
        for France it gives a seemingly strange result.

        France has colonies that are a long way from mainland France and these skew the centroid value.Instead of being in the body of mainland France it actually appears in the north of Spain.I have not tried to resolve this as it is not a bug as such,
        more an unexpected result.

        Finally we add the same mouseover / mouseout and click functionalities to the label as we did to the countries.Without this a displayed label disables the mouse functionality on the area of country it covers.

        countryLabels = countriesGroup
        .selectAll("g")
        .data(json.features)
        .enter()
        .append("g")
        .attr("class", "countryLabel")
        .attr("id", function (d) {
            return "countryLabel" + d.properties.iso_a3;
        })
        .attr("transform", function (d) {
            return (
                "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
            );
        })
        // add mouseover functionality to the label
        .on("mouseover", function (d, i) {
            d3.select(this).style("display", "block");
        })
        .on("mouseout", function (d, i) {
            d3.select(this).style("display", "none");
        })
        // add an onlcick action to zoom into clicked country
        .on("click", function (d, i) {
            d3.selectAll(".country").classed("country-on", false);
            d3.select("#country" + d.properties.iso_a3).classed("country-on", true);
            boxZoom(path.bounds(d), path.centroid(d), 20);
        });
        We add text to each label group using the“ name” property present in the GeoJSON data.

        Once defined we use our“ getTextBox”
        function to define the bounding box of our newly created text.This allows us to then add a background rectangle that is slightly wider and the same height as the text bounding box.

        // add the text to the label group showing country name
        countryLabels
        .append("text")
        .attr("class", "countryName")
        .style("text-anchor", "middle")
        .attr("dx", 0)
        .attr("dy", 0)
        .text(function (d) {
            return d.properties.name;
        })
        .call(getTextBox);
        // add a background rectangle the same size as the text
        countryLabels
        .insert("rect", "text")
        .attr("class", "countryBg")
        .attr("transform", function (d) {
            return "translate(" + (d.bbox.x - 2) + "," + d.bbox.y + ")";
        })
        .attr("width", function (d) {
            return d.bbox.width + 4;
        })
        .attr("height", function (d) {
            return d.bbox.height;
        });