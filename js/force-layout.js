var dataset = { 
		nodes: [
                { name: "Adam" },
                { name: "Bob" },
                { name: "Carrie" },
                { name: "Donovan" },
                { name: "Edward" },
		        { name: "Felicity" },
		        { name: "George" },
		        { name: "Hannah" },
		        { name: "Iris" },
		        { name: "Jerry" }
		],
		edges: [
			{ source: 0, target: 1 },
			{ source: 0, target: 2 },
			{ source: 0, target: 3 },
			{ source: 0, target: 4 },
			{ source: 1, target: 5 },
			{ source: 2, target: 5 },
			{ source: 2, target: 5 },
			{ source: 3, target: 4 },
			{ source: 5, target: 8 },
			{ source: 5, target: 9 },
			{ source: 6, target: 7 },
			{ source: 7, target: 8 },
			{ source: 8, target: 9 }
		]
	};

var  margin = { top: 100, left: 100, right: 100, bottom: 100 },
	 width = 800 - margin.left - margin.right, 		// Width of the chart
	 height = 600 - margin.top - margin.bottom;		// Height of the chart
var color = d3.scale.category20();

// Create force layout
var force = d3.layout.force()
						.nodes(dataset.nodes)
						.links(dataset.edges)
						.size([width, height])
						.linkDistance([50])
						.charge([-100])
						.start();


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

var edges = svg.selectAll('line')
				.data(dataset.edges)
			    .enter()
			    .append("line")
			    .style("stroke", "#ccc")
			    .style("stroke-width", 1);

var nodes = svg.selectAll('circles')
				.data(dataset.nodes)
				.enter()
				.append('circle')
				.attr('r', 10)
				.attr('fill', function(d,i) { return color(i); })
				.call(force.drag);

force.on("tick", function() {
	edges.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
	nodes.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
});

