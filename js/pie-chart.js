var margin = { top: 50, left: 50, right: 50, bottom: 50 };
var width = 650 - margin.left - margin.right;
var height = 650 - margin.top - margin.bottom;

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

var pie = d3.layout.pie();

d3.tsv('data/data.tsv', type, graph);

function graph(error, data) {

	// Create a new array of values
	var values = data.map(function(d){ return d.frequency; });
	var pieData = pie(values);

	// Set variables for pie chart
	var outerRadius = width / 2;
	var innerRadius = width / 3;
	var arc = d3.svg.arc()
					.innerRadius(innerRadius)
					.outerRadius(outerRadius);

	// Set colors for arc
	var color = d3.scale.category20();
	
	// Create groups for arcs
	var arcs = svg.selectAll('g.arc')
					.data(pieData)
					.enter()
						.append('g')
						.attr('class', 'arc')
						.attr('transform', 'translate('+outerRadius+', '+outerRadius+')');
	
	// Draw the arcs
	arcs.append('path')
		.attr('fill', function(d,i) { return color(i); })
		.attr('d', arc);
	// Add text
	arcs.append('text')
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.attr("text-anchor", "middle")
			.text(function(d,i){ return data[i].letter; });

}

function type(d) {
	return {
		letter: 	d.letter,
		frequency: 	+d.frequency
	};
}