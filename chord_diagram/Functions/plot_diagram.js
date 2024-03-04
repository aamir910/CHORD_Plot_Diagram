function Chord_initials(matrix){  


    
    const width = 700;
    const height = 700;
    const outerRadius = Math.min(width, height) * 0.5 - 30;
    const innerRadius = outerRadius - 70;


    // Create the chord layout
    const chord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);

    // Create the SVG
    const svg = d3.select("#chordDiagram")
        .append("svg")
        .attr("viewBox", [-width  , -height +200, width * 2, height * 2])
        .attr("width", "100%")
        .attr("height", "auto")
        .attr("font-size", 12)
        .attr("font-family", "sans-serif");

    // Define the colors
    const color = d3.scaleOrdinal()
        .domain(d3.range(matrix.length))
        .range(d3.schemeCategory10);

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
    .attr("fill", d => d.bold ? "#000080" : color(d.index))
    .attr("stroke", d => d.bold ? "#000080" : d3.rgb(color(d.index)).darker())
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
    .attr("dy", ".35em") 
    .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${innerRadius + 80})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
    `)
    .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
    .style("font-weight", d => d.bold ? "bold" : "normal")
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
        .attr("fill", d => color(d.source.index))
        .attr("stroke", d => d3.rgb(color(d.source.index)).darker());

}
