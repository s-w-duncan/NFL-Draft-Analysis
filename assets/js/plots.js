function biodiversityID() {
    var selDataset = d3.select("#my_dataviz");
    d3.json("assets/data/2006_draft_data.json").then((data) => {
    var samples = data.Pick;
    samples.forEach((sample) => {
        selDataset.append("option")
        .text(sample)
        .property("value", sample);
    });
    var firstsample = samples[0];
    console.log(firstsample)
    playerInfo(firstsample);
    createChart(firstsample);
    });
}
biodiversityID();

function playerInfo(stats) {
    d3.json("samples.json").then((data) => {
    var team = data.Team;
    console.log(Team)
    var infoArray = metadata.filter(sampleobject => sampleobject.id == sampleID);
    console.log(infoArray)
    var result = infoArray[0];
    console.log(result)
    var display = d3.select("#sample-metadata");
    display.html("");
    Object.entries(result).forEach(([key,value]) => {
        display.append("h6").text(`${key}: ${value}`);
    });
});
}

function createChart(sampleID) {
    d3.json("samples.json").then((data) => {
        var sampleData = data.samples;
        var infoArray = sampleData.filter(sampleobject => sampleobject.id == sampleID);
        var result = infoArray[0];
        var otu_ids = result.otu_ids;
        var otu_lables = result.otu_lables;
        var sample_values = result.sample_values;
    
    var bubbledata = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_lables,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }

        }
    ];
    Plotly.newPlot("bubble", bubbledata);
    
    var bardata = [{
        type: 'bar',
        x: sample_values,
        y: otu_lables,
        orientation: 'h',
        
      }];
      
      Plotly.newPlot('bar', bardata);
});
}
function optionChanged(sampleNew) {
    createChart(sampleNew);
    demographicInfo(sampleNew);

    
}