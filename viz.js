// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 150},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bar")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize axes
var x = d3.scaleLinear()
      .range([ 0, width]); 
var xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "myXaxis")

var y = d3.scaleBand()
      .range([ 0, height ])
      .padding(.1);
var yAxis = svg.append("g")

// Init Tooltip
var tool = d3
        .select('body')
        .append('div')
        .attr('class', 'tool')
        .style('opacity', 0);
    
function update(selectedVar) {
// Parse the Data
d3.csv("emissions.csv", function(data) {
    // X axis
    x.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    xAxis.transition().duration(1000).call(d3.axisBottom(x));
  
    // Y axis
    y.domain(data.map(function(d) { return d.CompanyName; }));
    yAxis.transition().duration(1000).call(d3.axisLeft(y));
      
    // Bars
    var u = svg.selectAll("rect")
      .data(data)

     u.enter()
      .append("rect")
      .merge(u)
      // Tooltips
      .on('mouseover', function(d) {
        d3.select(this).transition().duration(200).attr("fill", "rgb(1, 219, 1)")
        tool.transition().duration(200).style('opacity', 0.9);
        if (selectedVar == 'Scope1Min') {
          tool.html(`${d[selectedVar]} x 1000 MTCO2e`)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        } else {
          tool.html(`${d[selectedVar]} x 1000 MTCO2e`)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        }
      })
      .on('mouseout', function(d) {
        d3.select(this).transition().duration(200).attr("fill", "#228833")
        tool.transition().duration(500).style('opacity', 0);
      })
      // transition effects for bars
      .transition()
      .duration(1000)
      .attr("x", x(0) )
      .attr("y", function(d) { return y(d.CompanyName); })
      .attr("width", function(d) { 
          return x(d[selectedVar]); })
      .attr("height", y.bandwidth() )
      .attr("fill", "#228833")
      
      ;
  })
}

update('Scope1Min')

