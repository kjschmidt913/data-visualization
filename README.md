# Data Visualization

A data visualization project using D3.js. I created this project to learn more about D3.js, and to play around with different graphs on my own time. I'll continue adding to it, but right now it contains a horizontal bar graph, a bubble chart, a donut chart, and a pie chart, with responsive code included for mobile. If you're having trouble creating any of these graphs, perhaps looking through this project can help! Data is from the Centers for Disease Control and Prevention, United States Census Bureau, and YouGov, which are all linked to in the project.
 
## Graphs Included
* Horizontal Bar Chart
* Bubble Chart
* Donut Chart (that can transition between different data sets)
* Pie Chart (that can transition between different data sets)

## Getting Started

Each graph has it's own .js file named with what type of graph it is. The data for each graph is included in its file. The html has divs with ID's matching the type of graph.

Example: pieChart.js includes code for the pie chart and the data it uses. In the html, it appears in a div with the ID #pie.

I've written a [tutorial](https://medium.com/@kj_schmidt/making-an-animated-donut-chart-with-d3-js-17751fde4679) that goes into more detail for implementing the donut chart, and another [tutorial](https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2) for adding the mouse-over effects.

## Preview Live

See a live preview [here](https://kjschmidt913.github.io/data-visualization/).


## Built With

* [D3.js](https://d3js.org/) version 4.6.0
* [Bootstrap](https://v4-alpha.getbootstrap.com/) 4.1.3
