
function drawExpertiseGraph(){

  // Define data set for expertise graph
  var data = {
            name: "",
            children: [
              { name: 'D3.js', value: 90, label: 'Data Visualization', color: '#D17243'},
              { name: 'AngularJS', value: 95, label: 'Frontend Development', color: '#DB1A1A' },
              { name: 'Node.js', value: 50, label: 'Backend Development', color: '#30FF42' },
              { name: 'Socket.io', value: 50, label: 'Real-time Applications', color: '#245E8C' },
              { name: 'SPSS Modeler', value: 90, label: 'Data Mining', color: '#8D3396' },
              { name: 'WEKA', value: 90, label: 'Data Mining', color: '#7A2F2F' },
              { name: 'Ruby on Rails', value: 100, label: 'Rapid Prototyping', color: '#C22D2D' },
              { name: 'HTML/CSS', value: 100, label: 'Frontend Development', color: '#ED7D21' },
              { name: 'iOS Dev', value: 85, label: 'Mobile Development', color: '#9E9E9E' },
              { name: 'Linux/Unix', value: 80, label: 'System Administration', color: '#474747' },
              { name: 'DB2, PostgreSQL', value: 80, label: 'Database Administration', color: '#E5FF96' },
              { name: 'Java EE', value: 85, label: 'Enterprise Applications', color: '#0099FF' }
            ]
          }

  var diameter = 550;
  var color = d3.scale.category20c();
  var bubble = d3.layout.pack()
                        .sort(null)
                        .size([diameter, diameter])
                        .padding(1.5);

  // Create the svg and group element.
  var svg = d3.select("#graph").append('svg')
                              .attr('width', diameter)
                              .attr('height', diameter)
                              .attr('class', 'bubble');

  var node = svg.selectAll('.node')
                .data(bubble.nodes(data))
                .enter()
                .append('g')
                .attr('class', 'node')
                .attr('transform', function(d){ return 'translate('+d.x+', '+d.y+')'; });

  node.append('circle')
      .attr('r', function(d){ return d.r; })
      .attr('fill', function(d,i) { 
        if(i==0) return 'transparent';
        else return color(i);
      } );

  node.append('text')
      .attr('text-anchor', 'middle')
      .style('font-size', '11')
      .attr('y', 5)
      .text(function(d) { return d.name; })
}

drawExpertiseGraph();












