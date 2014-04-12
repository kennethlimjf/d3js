// Specify the width and height of canvas
var width = 500;
var height = 450;
var margin = {top: 50, left: 50, right: 50, bottom: 50};
var barHeight = 15;

// Create a svg canvas for drawing
var svg = d3.select('body').append('div')
							.attr('class', 'row')
								.append('div')
								.attr('class', 'large-12 large-centered columns')
									.append('svg')
									.attr('width', width + margin.left + margin.right)
									.attr('height', height + margin.top + margin.bottom);


d3.tsv('data/data.tsv', type, graph);

function graph (error, data) {
	// Create a scale for the bar width
	var x = d3.scale.linear()
					.domain( [0, d3.max(data, function(d){ return d.frequency; })] )
					.range( [0, width] );

	// Create groups for each bar
	// Note the separation of concerns here. Groups acts as a container for bar and text, and handles the location of itself.
	var barGroups = svg.selectAll('g')
					.data(data)
					.enter()
						.append('g')
						.attr('transform', function(d,i) { return 'translate(10, ' + (i * (barHeight + 1)) + ')'; });
	// Create bars in each barGroup
	barGroups.append('rect')
				.attr('width', function(d){ return x(d.frequency); })
				.attr('height', barHeight)
				.attr('fill', 'steelblue');
	// Append text after the end of each bar
	barGroups.append('text')
				.attr('x', function(d) { return x(d.frequency) + 5; })
				.attr('y', barHeight/1.55 )
				.attr('fill', 'black')
				.attr('font-size', 10)
				.text(function(d){ return d.letter; });
}

function type(d){
	d.value = +d.frequency
	return d;
}