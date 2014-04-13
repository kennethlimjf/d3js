// Set graph variables
var  margin = { top: 100, left: 100, right: 100, bottom: 100 },
	   width = 800 - margin.left - margin.right, 		// Width of the chart
	   height = 600 - margin.top - margin.bottom;		// Height of the chart

var rawDataSet = [
				{ apples: 5, oranges: 10, grapes: 22 },
				{ apples: 4, oranges: 12, grapes: 28 },
				{ apples: 2, oranges: 19, grapes: 32 },
				{ apples: 7, oranges: 23, grapes: 35 },
				{ apples: 23, oranges: 17, grapes: 43 }
				];

// Convert dataset
var apples = [];
var oranges = [];
var grapes = [];
for(var i=0; i<rawDataSet.length; i++) {
	apples.push({x: i, y: rawDataSet[i].apples});
	oranges.push({x: i, y: rawDataSet[i].oranges});
	grapes.push({x: i, y: rawDataSet[i].grapes});
}
var preStackedDataSet = [];
preStackedDataSet.push(apples);
preStackedDataSet.push(oranges);
preStackedDataSet.push(grapes);

// Create stack helper
var stack = d3.layout.stack();

// Create stacked data
var stackedDataSet = stack(preStackedDataSet);

// Create flatten dataSet
var dataSet = [];
for(var i=0; i<stackedDataSet.length; i++){
	var arrayOfFruit = stackedDataSet[i];
	for(var j=0; j<arrayOfFruit.length; j++){
		arrayOfFruit[j].type = i;
		dataSet.push(arrayOfFruit[j]);
	}
}

// Set variables and scales for graph
var barWidth = width / rawDataSet.length;
var y = d3.scale.linear()
				.range([0, height])
				.domain([0, 90]);

var yAxisScale = d3.scale.linear()
				.range([height, 0])
				.domain([0, 90]);


// Create a row and column for SVG canvas later
var column = d3.select('body').append('div')
                              .attr('class', 'row')
                              .append('div')
                              .attr('class', 'large-12 columns');
var svg = column.append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate('+margin.left+', '+margin.top+')');

svg.selectAll('g')
	.data(dataSet)
	.enter()
	.append('g')
	.attr('class', 'bars')
		.append('rect')
		.attr('x', function(d) { return d.x * barWidth; })
		.attr('width', barWidth - 1)
		.attr("y", function(d) { return height - y(d.y) - y(d.y0); })
      	.attr("height", function(d) { return y(d.y); })
		.attr('fill', function(d) {
			switch(d.type){
				case 0:
					return 'red';
				case 1:
					return 'orange';
				case 2:
					return 'purple';
				default:
					return 'black';
			}
		});

var yAxis = d3.svg.axis()
					.scale(yAxisScale)
					.orient("left");

svg.append('g')
     .attr('class', 'y axis')
     .attr('transform', 'translate(0,0)')
     .call(yAxis);