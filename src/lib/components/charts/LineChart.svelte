<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    export let data; // Prop para recibir los datos de la gráfica
    export let tooltip; // Prop para pasar el tooltip

    onMount(() => {
        if (!data || data.size === 0) {
            console.warn("No data provided to SalesOverTimeChart.");
            return; // Salir si no hay datos
        }
        const margin = { top: 20, right: 30, bottom: 30, left: 60 };
        const chartHeight = 300 - margin.top - margin.bottom;
        const width = 300 - margin.left - margin.right;

        const chart = d3.select("#sales-over-time-chart-svg") // ID específico
            .append("svg")
            .attr("width", "100%")
            .attr("height", 300);

        const width2 = chart.node().getBoundingClientRect().width - margin.left - margin.right;


        const xLine = d3.scalePoint()
            .domain(Array.from(data.keys()))
            .range([0, width2]);
        const yLine = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[1])]).nice()
            .range([chartHeight, 0]);

        const gLine = chart.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        gLine.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(xLine));
        gLine.append("g")
            .call(d3.axisLeft(yLine).ticks(5).tickSizeOuter(0));

        gLine.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xLine(d[0]) })
                .y(function (d) { return yLine(d[1]) })
            );

        gLine.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => xLine(d[0]))
            .attr("cy", d => yLine(d[1]))
            .attr("r", 5)
            .attr("fill", "steelblue")
            // --- Interactividad para Puntos de Línea ---
            .on('mouseover', function (event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`<div class="tooltip-label">Fecha:</div><div class="tooltip-value">${d[0]}</div><div class="tooltip-label">Ingresos:</div><div class="tooltip-value">$${d[1].toFixed(2)}</div>`)
                    .style("left", (event.clientX) + "px")
                    .style("top", (event.clientY - 28) + "px");
            })
            .on('mousemove', function (event, d) {
                tooltip.style("left", (event.clientX) + "px")
                    .style("top", (event.clientY - 28) + "px");
            })
            .on('mouseout', function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });
</script>

<div id="sales-over-time-chart-svg"></div>