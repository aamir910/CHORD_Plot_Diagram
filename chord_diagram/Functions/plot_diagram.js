function Chord_initials(matrix){  


    
    const width = 700;
    const height = 700;
    const outerRadius = Math.min(width, height) * 0.5 - 30;
    const innerRadius = outerRadius - 70;


    // Create the chord layout
    const chord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.ascending)
        .sortChords(d3.ascending);

    // Create the SVG
    const svg = d3.select("#chordDiagram")
        .append("svg")
        .attr("viewBox", [-width  , -height +200, width * 2, height * 2])
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
        "#FFDAB9", // PeachPuff
        "#FFB6C1", // LightPink
        "#FFD700", // Gold
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
        "#FFDEAD" ,  // NavajoWhite
        
        "#FF8C00", // DarkOrange
      ];
      
  const color = [
        "#FF0000", // Red
        "#FFA500", // Orange
        "#FFFF00", // Yellow
        "#008000", // Green
        "#4090ff", // Blue
        "#4B0082", // Indigo
        "#9400D3", // Violet
        "#FF1493", // DeepPink
        "#FF4500", // OrangeRed
        "#FFD700", // Gold
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
        "#FFFFFF", // White
        "#000000"  // Black
      ];







    console.log(color ,"here are the color " ,matrix.length )
    // Compute the chord layout
    const chords = chord(matrix);
    console.log(chords)
   let chord2 =   chords;


//    here update the size of the ribben value 
chord2.forEach(chord => {
     chord.target.value += 5;
     
     chord.source.value += 5;
     
 });
 
    console.log( "new chord " , chord2)
    // Add the groups
    const group = svg.append("g")
        .selectAll("g")
        .data(chord2.groups)
        .join("g");

    // Add the arcs for the groups
    const minimumArcSize = 400; // Adjust this value as needed

    // Add the arcs for the groups
    group.append("path")
    .each((d, i) => {
        console.log("before " , d);
        d.bold = i >= 15; // Bold text from index 7 onwards
        console.log("before " , d);
    })
    .attr("fill", d => d.bold ? "#09467f" : color[d.index])
    .attr("stroke", d => d.bold ? "#09467f" : d3.rgb(color[d.index]) )
    .attr("d", d3.arc()
        .innerRadius(innerRadius) // Inner radius of the arc
        .outerRadius(outerRadius) // Outer radius of the arc
        .startAngle(d => d.startAngle) // Start angle of the arc
        .endAngle(d => d.endAngle) // End angle of the arc
    );

    // Add the group labels
    group.append("text")
    .each((d, i) => {
        console.log("before " , d);
        d.angle = (d.startAngle + d.endAngle) / 2;
        d.bold = i >= 15; // Bold text from index 7 onwards
        console.log("before " , d);
    })
    // .attr("dy", ".35em") 
    .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${innerRadius + 80})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
    `)
    .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
    .style("font-weight", d => d.bold ? "bold" : "normal")
    .style("font-size","09px")
    
    .text((d, i) => categories[i]);


    // Add the chords
    svg.append("g")
        .attr("fill-opacity", 0.47)
        .selectAll("path")
        .data(chord2)
        .join("path")
        .attr("d", d3.ribbon()
            .radius(innerRadius)
        )
        .attr("fill", d => color[d.source.index])
        .attr("stroke", d => d3.rgb(color[d.source.index]).darker());

}
