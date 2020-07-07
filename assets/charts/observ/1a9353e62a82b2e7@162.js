// https://observablehq.com/d/1a9353e62a82b2e7@162
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["draft@1.json",new URL("0d178da975d5f2efe4154989eab19895365332b36241c97602a2d141f1bad3ad7ff2c6efe781c95cb21832c6c5cae2263c22fde587adef66b4ed63806c7e3ee0",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("viewof tile")).define("viewof tile", ["d3","html"], function(d3,html)
{
  const options = [
    {name: "d3.treemapBinary", value: d3.treemapBinary},
    {name: "d3.treemapDice", value: d3.treemapDice},
    {name: "d3.treemapSlice", value: d3.treemapSlice},
    {name: "d3.treemapSliceDice", value: d3.treemapSliceDice},
    {name: "d3.treemapSquarify", value: d3.treemapSquarify, selected: true}
  ];
  const form = html`<form style="display: flex; align-items: center; min-height: 33px;"><select name=i>${options.map(o => Object.assign(html`<option>`, {textContent: o.name, selected: o.selected}))}`;
  form.i.onchange = () => form.dispatchEvent(new CustomEvent("input"));
  form.oninput = () => form.value = options[form.i.selectedIndex].value;
  form.oninput();
  return form;
}
);
  main.variable(observer("tile")).define("tile", ["Generators", "viewof tile"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["treemap","data","d3","width","height","format","DOM","color"], function(treemap,data,d3,width,height,format,DOM,color)
{
  const root = treemap(data);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("font", "10px sans-serif");

  const leaf = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

  leaf.append("title")
      .text(d => `${d.ancestors().reverse().map(d => d.data.name).join("/")}\n${format(d.value)}`);

  leaf.append("rect")
      .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", 0.6)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0);

  leaf.append("clipPath")
      .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
    .append("use")
      .attr("xlink:href", d => d.leafUid.href);

  leaf.append("text")
      .attr("clip-path", d => d.clipUid)
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value)))
    .join("tspan")
      .attr("x", 3)
      .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
      .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
      .text(d => d);

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("draft@1.json").json()
)});
  main.variable(observer("treemap")).define("treemap", ["d3","tile","width","height"], function(d3,tile,width,height){return(
data => d3.treemap()
    .tile(tile)
    .size([width, height])
    .padding(1)
    .round(true)
  (d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value))
)});
  main.variable(observer("width")).define("width", function(){return(
954
)});
  main.variable(observer("height")).define("height", function(){return(
954
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleOrdinal(d3.schemeCategory10)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
