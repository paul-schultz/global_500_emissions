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

function update(selectedVar) {
// Parse the Data
d3.csv("emissions.csv", function(data) {
    // Add X axis
    var x = d3.scaleLinear()
      .domain([0, 140000])
      .range([ 0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
  
    // Y axis
    var y = d3.scaleBand()
      .range([ 0, height ])
      .domain(data.map(function(d) { return d.CompanyName; }))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(y))
  
    console.log(data)
      
    //Bars
    var u = svg.selectAll("rect")
      .data(data)

     u.enter()
      .append("rect")
      .merge(u)
      .attr("x", x(0) )
      .attr("y", function(d) { return y(d.CompanyName); })
      .attr("width", function(d) { 
          return x(d[selectedVar]); })
      .attr("height", y.bandwidth() )
      .attr("fill", "#69b3a2")
  })
}

update('Scope1Min')