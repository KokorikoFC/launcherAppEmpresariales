<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    export let data; // Prop para recibir los datos de la gráfica
    export let tooltip; // Prop para pasar el tooltip

    onMount(() => {
        if (!data || data.size === 0) {
            console.warn("No data provided to SalesDistributionChart.");
            return; // Salir si no hay datos
        }
        const margin = { top: 20, right: 30, bottom: 30, left: 60 };
        const chartHeight = 300 - margin.top - margin.bottom;
        const width = 300 - margin.left - margin.right;

        const chart = d3.select("#sales-distribution-chart-svg") // ID específico
            .append("svg")
            .attr("width", "100%")
            .attr("height", 300);


        const width3 = chart.node().getBoundingClientRect().width - margin.left - margin.right;

        const gPie = chart.append("g") // Grupo para la gráfica de tarta
            .attr("transform", `translate(${width3 / 2 + margin.left},${chartHeight / 2 + margin.top})`); // Centrar la tarta


        const pie = d3.pie()
            .value(d => d[1]);
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width3, chartHeight) / 2);
        const colorPie = d3.scaleOrdinal()
            .domain(Array.from(data.keys()))
            .range(d3.schemeSet2); // Esquema de colores


        gPie.selectAll("path")
            .data(pie(Array.from(data)))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', d => colorPie(d.data[0]))
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            // --- Interactividad para Tarta ---
            .on('mouseover', function (event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`<div class="tooltip-label">Producto:</div><div class="tooltip-value">${d.data[0]}</div><div class="tooltip-label">Cantidad Vendida:</div><div class="tooltip-value">${d.data[1]}</div>`)
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

<div id="sales-distribution-chart-svg"></div>