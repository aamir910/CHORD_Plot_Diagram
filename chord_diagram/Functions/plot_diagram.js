function Chord_initials(matrix){  
    const width = 800;
    const height = 800;
    const outerRadius = Math.min(width, height) * 0.5 - 40;
    const innerRadius = outerRadius - 30;


    // Create the chord layout
    const chord = d3.chord()
        .padAngle(0.1)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);

    // Create the SVG
    const svg = d3.select("#chordDiagram")
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width * 2, height * 2])
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



    const filteredGroups = chords.groups.filter(group => {
        console.log("here is the group ", group)

        // return chords.groups.find(g => g.source.index === group.index || g.target.index === group.index);
    });


    // Add the groups
    const group = svg.append("g")
        .selectAll("g")
        .data(chords.groups)
        .join("g");

    // Add the arcs for the groups
    const minimumArcSize = 400; // Adjust this value as needed

    // Add the arcs for the groups
    group.append("path")
        .attr("fill", d => color(d.index))
        .attr("stroke", d => d3.rgb(color(d.index)).darker())
        .attr("d", d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(d => Math.max(minimumArcSize, outerRadius)) // Set the outer radius with a minimum size
        );

    // Add the group labels
    group.append("text")
        .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
        .attr("dy", ".35em")
        .attr("transform", d => `
    rotate(${(d.angle * 180 / Math.PI - 90)})
    translate(${innerRadius + 10})
    ${d.angle > Math.PI ? "rotate(180)" : ""}
`)
        .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
        .text((d, i) => categories[i]);

    // Add the chords
   // Define the minimum size for the ribbons
const minimumRibbonSize = 2; // Adjust this value as needed

// Add the chords
svg.append("g")
    .attr("fill-opacity", 0.4)
    .selectAll("path")
    .data(chords)
    .join("path")
    .attr("d", d3.ribbon()
        .radius(innerRadius)
        .source(d => {
            // Check if the value is less than the minimum size, if so, adjust the value
            d.source.value = Math.max(minimumRibbonSize, d.source.value);
            return d.source;
        })
        .target(d => {
            // Check if the value is less than the minimum size, if so, adjust the value
            d.target.value = Math.max(minimumRibbonSize, d.target.value);
            return d.target;
        })
    )
    .attr("fill", d => color(d.source.index))
    .attr("stroke", d => d3.rgb(color(d.source.index)).darker());


}
