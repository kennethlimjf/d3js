// Set graph variables
var margin = { top: 100, left: 100, right: 100, bottom: 100 },
	width = 800 - margin.left - margin.right, 		// Width of the chart
	height = 600 - margin.top - margin.bottom,		// Height of the chart
	textLabelSize = 10,
	textLabelColor = 'black',
	barColor = 'steelblue';

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

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

d3.tsv('data/data.tsv', type, graph);

function graph(error, data){
	x.domain( data.map(function(d) { return d.letter; }) );
  	y.domain( [ 0, d3.max(data, function(d) { return d.frequency; }) ] );
	
	var barWidth = width / data.length;

	var barGroups = svg.selectAll('g')
						.data(data)
						.enter()
							.append('g')
							.attr('transform', function(d,i) { return 'translate(' + (barWidth * i) + ', 0)'; } );

	barGroups.append('rect')
				.attr('y', function(d) { return y(d.frequency); })
				.attr('width', barWidth - 1)
				.attr('height', function(d){ return height - y(d.frequency); })
				.attr('fill', barColor);

	var xAxis = d3.svg.axis()
    					.scale(x)
    					.orient("bottom");

    svg.append('g')
    	.attr('class', 'x axis')
    	.attr('transform', 'translate(0,'+height+')')
    	.call(xAxis)
    		.append('text')
    			.attr('x', function() { return width * 0.45} )
      		.attr('y', 35)
    			.text('Letters');

    var yAxis = d3.svg.axis()
    					.scale(y)
    					.orient("left")
    					.ticks(10, "%");
   	svg.append('g')
   		.attr('class', 'y axis')
   		.attr('transform', 'translate(0,0)')
   		.call(yAxis)
   		.append('text')
   			.attr('y', -40)
   			.attr('transform', 'rotate(-90)')
   			.style('text-anchor', 'end')
   			.text("Frequency");
}

function type(d) {
	d.frequency = +d.frequency // Coerce to number type
	return d;
}