var svgWidth = 900;
var svgHeight = 600;

var margin = {
    top: 40,
    bottom: 90,
    right: 40,
    left: 100
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Parameters
var chosenXAxis = "College_Passer_Rating";
var chosenYAxis = "Pick";

// Update X-Scale Variable on Click
function xScale(playerData, chosenXAxis) {
    // Create Scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(playerData, d => d[chosenXAxis]) * 1.5,
            d3.max(playerData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);

    return xLinearScale;

}

// Update Y-Scale Variable on Click
function yScale(playerData, chosenYAxis) {
    // Create Scales.
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(playerData, d => d[chosenYAxis]) * .8,
            d3.max(playerData, d => d[chosenYAxis]) * 1.2
        ])
        .range([height, 0]);

    return yLinearScale;
}

// Update X Axis Variable on Click
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// Update Y Axis Variable on Click
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

// Update Group with Transition
function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
}

// Update Text with Transition
function renderText(circletextGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
    circletextGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newYScale(d[chosenYAxis]));
    
    return circletextGroup;
}

// Update Group with Tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    // Conditional on X Axis
    if (chosenXAxis === "College_Passer_Rating") {
        var xlabel = "College Passer Rating: ";
    }
    else if (chosenXAxis === "College_Passing_Pct") {
        var xlabel = "College Passing Percentage: "
    }
    else {
        var xlabel = "College Passing TDs: "
    }

    // Conditional on Y Axis
    if (chosenYAxis === "Pick") {
        var ylabel = "Draft Pick: ";
    }
    else if (chosenYAxis === "Round") {
        var ylabel = "Round Drafted: "
    }
    else {
        var ylabel = "Years as a NFL Starter: "
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .style("background", "black")
        .style("color", "white")
        .offset([0, 0])
        .html(function(d) {
            if (chosenXAxis === "College_Passing_TDs") {
                
                return (`${d.Player_Name}<hr>${xlabel} ${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}`);
              } else if (chosenXAxis !== "College_Passer_Rating" && chosenXAxis !== "College_Passing_TDs") {
                
                return (`${d.Player_Name}<hr>${xlabel}${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}`);
              } else {
                
                return (`${d.Player_Name}<hr>${xlabel}${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}`);
              }      
        });
    
    circlesGroup.call(toolTip);
    
    // On Click and MouseOver
    circlesGroup

        .on("click", function(data) {
            toolTip.show(data, this);
        })

        .on("mouseout", function(data) {
            toolTip.hide(data)
        });

    return circlesGroup;
}

// Import Data
d3.csv("qb_data.csv")
    .then(function(playerData) {

    // Parse Data and Cast As Numbers
    playerData.forEach(function(data) {
        data.Round = +data.Round;
        data.Pick = +data.Pick;
        data.NFL_YearAs_A_Starter = +data.NFL_YearAs_A_Starter;
        data.NFL_Games_Played = +data.NFL_Games_Played;
        data.College_Passing_Pct = +data.College_Passing_Pct;
        data.College_Passing_TDs = +data.College_Passing_TDs;
        data.College_Passing_Rating = +data.College_Passing_Rating;
        console.log(data);
    });

    // Create X Scale
    var xLinearScale = xScale(playerData, chosenXAxis);

    // Create Y Scale
    var yLinearScale = yScale(playerData, chosenYAxis);

    // Create X & Y Axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(playerData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", "15")
        .attr("fill", "orange")
        .attr("opacity", ".5");

    var circletextGroup = chartGroup.selectAll()
        .data(playerData)
        .enter()
        .append("text")
        .text(d => (d.Player_Initials))
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        .style("font-size", "12px")
        .style("text-anchor", "middle")
        .style('fill', 'black');

    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var College_Passer_RatingLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "College_Passer_Rating") 
        .classed("active", true)
        .text("College Passer Rating");

    var College_Passing_TDsLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "College_Passing_TDs") 
        .classed("inactive", true)
        .text("College Passing TDs");

    var College_Passing_PctLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "College_Passing_Pct") 
        .classed("inactive", true)
        .text("College Passing Percentage");

    var PickLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", (margin.left) * 2.5)
        .attr("y", 0 - (height - 60))
        .attr("value", "Pick") 
        .classed("active", true)
        .text("Draft Pick");

    var RoundLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", (margin.left) * 2.5)
        .attr("y", 0 - (height - 40))
        .attr("value", "Round") 
        .classed("inactive", true)
        .text("Round Drafted");

    var NFL_YearAs_A_StarterLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", (margin.left) * 2.5)
        .attr("y", 0 - (height - 20))
        .attr("value", "NFL_YearAs_A_Starter") 
        .classed("inactive", true)
        .text("Years as a NFL Starter");

    // Update ToolT ip
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // X Axis Label Event
    labelsGroup.selectAll("text")
        .on("click", function() {
            // Obtain Value
            var value = d3.select(this).attr("value");

            if (true) {
                if (value === "College_Passer_Rating" || value === "College_Passing_Pct" || value === "College_Passing_TDs") {

                    chosenXAxis = value;
                    
                    // Update X Scale and Axis
                    xLinearScale = xScale(playerData, chosenXAxis);

                    xAxis = renderXAxes(xLinearScale, xAxis);

                    if (chosenXAxis === "College_Passer_Rating") {
                        College_Passer_RatingLabel
                            .classed("active", true)
                            .classed("inactive", false);

                        College_Passing_TDsLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        
                        College_Passing_PctLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    }
                    else if (chosenXAxis === "College_Passing_TDs"){
                        College_Passer_RatingLabel
                            .classed("active", false)
                            .classed("inactive", true);

                        College_Passing_TDsLabel
                            .classed("active", true)
                            .classed("inactive", false);

                        College_Passing_PctLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    }
                    else {
                        College_Passer_RatingLabel
                            .classed("active", false)
                            .classed("inactive", true);

                        College_Passing_TDsLabel
                            .classed("active", false)
                            .classed("inactive", true)

                        College_Passing_PctLabel
                            .classed("active", true)
                            .classed("inactive", false);
                    }
                
                } else {

                    chosenYAxis = value;

                    // Update Y Scale and Axis
                    yLinearScale = yScale(playerData, chosenYAxis);

                    yAxis = renderYAxes(yLinearScale, yAxis);

                    if (chosenYAxis === "Pick") {
                        PickLabel
                            .classed("active", true)
                            .classed("inactive", false);

                        RoundLabel
                            .classed("active", false)
                            .classed("inactive", true);

                        NFL_YearAs_A_StarterLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    }
                    else if (chosenYAxis === "Round"){
                        PickLabel
                            .classed("active", false)
                            .classed("inactive", true);

                        RoundLabel
                            .classed("active", true)
                            .classed("inactive", false);

                        NFL_YearAs_A_StarterLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    }
                    else {
                        PickLabel
                            .classed("active", false)
                            .classed("inactive", true);

                        RoundLabel
                            .classed("active", false)
                            .classed("inactive", true);

                        NFL_YearAs_A_StarterLabel
                            .classed("active", true)
                            .classed("inactive", false);
                    }
                
                }

                // Update Values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);

                circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

                circletextGroup = renderText(circletextGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);

            }
            
        });

});