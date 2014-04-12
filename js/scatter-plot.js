var margin = {top: 30, left: 75, right: 75, bottom: 75}
var width = 1000 - margin.left - margin.right;
var height = 550 + margin.top - margin.bottom;

// Create a row and column for SVG canvas later
var column = d3.select('body').append('div')
                              .attr('class', 'row')
                              .append('div')
                              .attr('class', 'large-12 columns');

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

d3.tsv('data/data2.tsv', type, graph);

function graph(error, data){

  x.domain([d3.min(data, function(d){ return d.sepalLength; }) - 0.5, d3.max( data, function(d) { return d.sepalLength; } ) + 0.5]);
  y.domain([d3.min(data, function(d){ return d.sepalWidth; }) - 0.5, d3.max( data, function(d) { return d.sepalWidth; } ) + 0.5]);
  r.domain([0, d3.max( data, function(d) { return Math.sqrt((d.petalLength * d.petalWidth) / Math.PI); })]);

  // Create main chart area
  var chart = svg.append('g')
                  .attr('width', width)
                  .attr('height', height)
                  .attr('transform', 'translate('+margin.left+', '+margin.top+')');

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
        }); 

  var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');
  var xAxisGroup = d3.select('svg').append('g')
                                    .attr('class','x axis')
                                    .attr('transform', 'translate('+ margin.left +', '+(height+margin.top)+')');
  xAxisGroup.call(xAxis);
  xAxisGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('x', width / 2)
            .attr('y', 40)
            .text('sepalLength (cm)');

  var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');
  var yAxisGroup = d3.select('svg').append('g')
                                    .attr('class','y axis')
                                    .attr('transform', 'translate('+ margin.left +', '+margin.top+')');
  yAxisGroup.call(yAxis);
  yAxisGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90), translate('+(height/2)*(-1)+',-50)')
            .text('sepalWidth (cm)');
}

function type(d){
  return {
    species: d.species,
    sepalLength: +d.sepalLength,
    sepalWidth: +d.sepalWidth,
    petalLength: +d.petalLength,
    petalWidth: +d.petalWidth
  };
}