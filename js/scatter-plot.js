// Declare the margins, width and height (Margins standard convention by Mike)
var margin = {top: 30, left: 75, right: 75, bottom: 75}
var width = 1000 - margin.left - margin.right;
var height = 550 + margin.top - margin.bottom;

// Create a row and column for SVG canvas later
var column = d3.select('body').append('div')
                              .attr('class', 'row')
                              .append('div')
                              .attr('class', 'large-12 columns');

// Create the svg canvas
var svg = column.append('svg')
                .attr({
                  width: width + margin.left + margin.right, 
                  height: height + margin.top + margin.bottom,
                });

// Create scales for data
var x = d3.scale.linear()
                .range( [0, width]);
var y = d3.scale.linear()
                .range( [height, 0]);
var r = d3.scale.linear()
                .range([0, 20]);

// Create axis
var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient('bottom');
var xAxisGroup = d3.select('svg').append('g')
                  .attr('class','x axis')
                  .attr('transform', 'translate('+ margin.left +', '+(height+margin.top)+')');

var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');
var yAxisGroup = d3.select('svg').append('g')
                                  .attr('class','y axis')
                                  .attr('transform', 'translate('+ margin.left +', '+margin.top+')');

// Load TSV data and draw graph
d3.tsv('data/data2.tsv', type, graph);
setTimeout(function(){
  d3.tsv('data/data2-update.tsv', type, update);
}, 100);


/*
 *  This function draws a graph with dummy data
 */
function graph(error, data){

  x.domain([d3.min(data, function(d){ return d.sepalLength; }), d3.max( data, function(d) { return d.sepalLength; } )]);
  y.domain([d3.min(data, function(d){ return d.sepalWidth; }), d3.max( data, function(d) { return d.sepalWidth; } )]);
  r.domain([0, 0.04]);

  // Create main chart area
  var chart = svg.append('g')
                  .attr('width', width)
                  .attr('height', height)
                  .attr('transform', 'translate('+margin.left+', '+margin.top+')');

  // Select all circles (empty), enter and create circles
  chart.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d) { return x(d.sepalLength); })
        .attr('cy', function(d) { return y(d.sepalWidth); })
        .attr('r', function(d) { return r(Math.sqrt((d.petalLength * d.petalWidth) / Math.PI)); })
        .attr('fill', function(d){
          switch(d.species){
            case 'setosa':
              return 'rgba(240, 63, 36, 0.5)';
            case 'versicolor':
              return 'rgba(36, 83, 240, 0.5)';
            case 'virginica':
              return 'rgba(36, 240, 121, 0.5)';
            default:
              return 'black';
          }
        })
        .on('click', function(d) {
          alert(
            'Species:\t\t'+d.species+'\n'+
            'sepalLength:\t'+d.sepalLength+'\n'+
            'sepalWidth:\t'+d.sepalWidth+'\n'+
            'petalLength:\t'+d.petalLength+'\n'+
            'petalWidth:\t'+d.petalWidth
            );
        }); 

  // Create xAxis 
  xAxisGroup.call(xAxis);
  xAxisGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('x', width / 2)
            .attr('y', 40)
            .text('sepalLength (cm)');

  // Create yAxis
  yAxisGroup.call(yAxis);
  yAxisGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90), translate('+(height/2)*(-1)+',-50)')
            .text('sepalWidth (cm)');

  var categories = d3.scale.ordinal()
                            .range()


  // Set the legend at the top right corner
  var legend = svg.selectAll(".legend")
      // Here we select distinct categories of species using the map and set functions
      .data(d3.set( data.map(function(d){ return d.species; }) ).values())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d){
          switch(d){
            case 'setosa':
              return 'rgba(240, 63, 36, 0.5)';
            case 'versicolor':
              return 'rgba(36, 83, 240, 0.5)';
            case 'virginica':
              return 'rgba(36, 240, 121, 0.5)';
            default:
              return 'black';
          }
      });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
}

/*
 *  This function updates the graph to the actual data, 100ms after load.
 */

function update(error, data) {

  x.domain([d3.min(data, function(d){ return d.sepalLength; }) - 0.5, d3.max( data, function(d) { return d.sepalLength; } ) + 0.5]);
  y.domain([d3.min(data, function(d){ return d.sepalWidth; }) - 0.5, d3.max( data, function(d) { return d.sepalWidth; } ) + 0.5]);
  r.domain([0, d3.max( data, function(d) { return Math.sqrt((d.petalLength * d.petalWidth) / Math.PI); })]);

  d3.selectAll('circle')
    .data(data)
      .transition()
      .duration(500)
      .delay(function(d,i) { return i * (500 / data.length); })
      // .ease('elastic')
      .attr('cx', function(d) { return x(d.sepalLength); })
        .attr('cy', function(d) { return y(d.sepalWidth); })
        .transition()
        .duration(500)
        .ease('elastic')
        .attr('r', function(d) { return r(Math.sqrt((d.petalLength * d.petalWidth) / Math.PI)); })
        .attr('fill', function(d){
          switch(d.species){
            case 'setosa':
              return 'rgba(240, 63, 36, 0.5)';
            case 'versicolor':
              return 'rgba(36, 83, 240, 0.5)';
            case 'virginica':
              return 'rgba(36, 240, 121, 0.5)';
            default:
              return 'black';
          }
        });

  svg.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);

  svg.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);

  d3.select('svg').on('dblclick', function(){
    data.shift();
    d3.selectAll('circle')
      .data(data)
      .exit()
        .transition()
        .duration(500)
        .attr('cx', width)
        .remove();
  });
}

/*
 *  This function parses the data types for each property in a datum.
 *  Numerical values are coerced from string to number using +
 */
function type(d){
  return {
    species: d.species,
    sepalLength: +d.sepalLength,
    sepalWidth: +d.sepalWidth,
    petalLength: +d.petalLength,
    petalWidth: +d.petalWidth
  };
}