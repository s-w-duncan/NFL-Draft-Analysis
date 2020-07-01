// Creating function for Data plotting (Bar, gauge, bubble)
function getPlot(id) {
    var newdataset = data
        // Create filters for graphs
        // i.e. var wfreq = data.metadata.map(d => d.wfreq)
        // or
        // filter sample values by id 
        // var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
  
        // IF NEEDED:
  
        // create layout variable to set plots layout
        // var layout = {
            // title: "Top 10 OTU",
            // yaxis:{
                // tickmode:"linear",
            // },
            // margin: {
                // l: 100,
                // r: 100,
                // t: 100,
                // b: 30
            // }
        // };
  
        // THEN: create your graph
        // Plotly.newPlot("bar", data, layout);

init();