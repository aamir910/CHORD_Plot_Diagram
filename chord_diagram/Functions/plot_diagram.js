function Chord_initials(matrix) {
  const width = 700;
  const height = 700;
  const outerRadius = Math.min(width, height) * 0.5 - 30;
  const innerRadius = outerRadius - 70;

  // Create the chord layout
  const chord = d3
    .chord()
    .padAngle(0.05)
    .sortSubgroups(d3.ascending)
    .sortChords(d3.ascending);

  // Create the SVG
  const svg = d3
    .select("#chordDiagram")
    .append("svg")
    .attr("viewBox", [
      -width + 200,
      -height + 350,
      width * 2 - 350,
      height * 2 - 700,
    ])

    // .attr("viewBox", [-width+100  , -height +350, width*2-350 , height*2-500 ])
    .attr("width", "100%")
    .attr("height", "auto")
    .attr("font-size", 12)
    .attr("font-family", "sans-serif");

  // Define the colors
  const color1 = [
    "#FF9999", // Medium Red
    "#FFCC66", // Medium Orange
    "#FFFF66", // Medium Yellow
    "#99FF99", // Medium Green
    "#66FFFF", // Medium Cyan
    "#9999FF", // Medium Purple
    "#FF99FF", // Medium Magenta
    "#197278", // PeachPuff
    "#FFB6C1", // LightPink
    "#734ec2", // Gold
    "#FF6347", // Tomato
    "#FF69B4", // HotPink
    "#00FA9A", // MediumSpringGreen
    "#20B2AA", // LightSeaGreen
    "#4682B4", // SteelBlue
    "#9370DB", // MediumPurple
    "#DCDCDC", // Gainsboro
    "#F5F5DC", // Beige
    "#FAF0E6", // Linen
    "#F0E68C", // Khaki
    "#D2B48C", // Tan
    "#BDB76B", // DarkKhaki
    "#FFDEAD", // NavajoWhite
    "#FF8C00", // DarkOrange
  ];

  const color = [
    "#197278", // Red
    "#FFA500", // Orange
    "#73610e", // brown
    "#008000", // Green
    "#4090ff", // Blue
    "#4B0082", // Indigo
    "#7b755a", // Violet
    "#FF1493", // DeepPink
    "#FF4500", // OrangeRed
    "#be5dc8", // Gold
    "#32CD32", // LimeGreen
    "#00FFFF", // Aqua
    "#000080", // Navy
    "#800080", // Purple
    "#FF69B4", // HotPink
    "#00FF7F", // SpringGreen
    "#87CEEB", // SkyBlue
    "#6A5ACD", // SlateBlue
    "#FFC0CB", // Pink
    "#800000", // Maroon
    "#808000", // Olive
    "#808080", // Gray
    "#508070", // White
    "#000000", // Black
  ];

  // Compute the chord layout
  const chords = chord(matrix);
  let chord2 = chords;

  //    here update the size of the ribben value
  chord2.forEach((chord) => {
    chord.target.value += 5;

    chord.source.value += 5;
  });

  console.log("new chord ", chord2);
  // Add the groups
  const group = svg.append("g").selectAll("g").data(chord2.groups).join("g");

  // Add the arcs for the groups
  const minimumArcSize = 400; // Adjust this value as needed

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Add the arcs for the groups
  group
    .append("path")
    .each((d, i) => {
      d.bold = i >= 15; // Bold text from index 7 onwards
    })
    .attr("fill", (d) => (d.bold ? "#09467f" : color[d.index]))

    // .attr("fill", d => d.bold ? "lightgrey" : color[d.index])
    .attr("stroke", (d) => color[d.index])
    .attr("stroke-width", 6)
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(innerRadius + 7) // Inner radius of the arc
        .outerRadius(outerRadius) // Outer radius of the arc
        .startAngle((d) => d.startAngle) // Start angle of the arc
        .endAngle((d) => d.endAngle) // End angle of the arc
    )
    .append("title") // Append title element to each path
    .text((d, i) => categories[i]); // Set title content for each path
  // Add the group labels

  // group.append("text")
  // .each((d, i) => {
  //     d.angle = (d.startAngle + d.endAngle) / 2;
  //     d.bold = i >= 15; // Bold text from index 7 onwards
  // })
  // .attr("opacity", 0) // Initially hide the text elements
  // .attr("transform", d => `
  //     rotate(${(d.angle * 180 / Math.PI - 90)})
  //     translate(${innerRadius + 80})
  //     ${d.angle > Math.PI ? "rotate(180)" : ""}
  // `)
  // .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
  // .style("font-weight", d => d.bold ? "bold" : "normal")
  // .style("font-size", "12px")
  // .text((d, i) => categories[i])
  // .on("mouseover", function() {
  //     d3.select(this).attr("opacity", 1); // Set opacity to 1 on hover
  // })
  // .on("mouseout", function() {
  //     d3.select(this).attr("opacity", 0); // Set opacity back to 0 when not hovered
  // })

  // Add the chords
  svg
    .append("g")
    .attr("fill-opacity", 0.47)
    .selectAll("path")
    .data(chord2)
    .join("path")
    .attr("d", d3.ribbon().radius(innerRadius))
    .attr("fill", (d) => color[d.source.index])
    .attr("stroke", (d) => {
  
      return d3.rgb(color[d.source.index]);
    })
    .on("mouseover", function () {
      d3.select(this).attr("fill-opacity", 2); // Set opacity to 1 on hover
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill-opacity", 0.47); // Set opacity back to 0.47 when not hovered
    })
    .append("title") // Append title element to each path
    .text(
      (d, i) =>
        `Source : ${categories[d.source.index]}
Target : ${categories[d.target.index]}
Value : ${d.target.value}
        `
    ); // Set title content for each path
}
