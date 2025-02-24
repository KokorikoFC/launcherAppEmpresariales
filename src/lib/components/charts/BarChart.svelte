<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    export let data; // Prop para recibir los datos de la gráfica
    export let tooltip; // Prop para pasar el tooltip 

    onMount(() => {
        if (!data || data.size === 0) {
            console.warn("No data provided to SalesByProductChart.");
            return; // Salir si no hay datos
        }

        const margin = { top: 20, right: 30, bottom: 30, left: 60 };
        const chartHeight = 300 - margin.top - margin.bottom;
        const width = 300 - margin.left - margin.right;
        const chart = d3.select("#sales-by-product-chart-svg") // ID específico para este componente
            .append("svg")
            .attr("width", "100%")
            .attr("height", 300);

        const width1 = chart.node().getBoundingClientRect().width - margin.left - margin.right;


        const x1 = d3.scaleBand()
            .domain(Array.from(data.keys()))
            .range([0, width1])
            .padding(0.2);
        const y1 = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[1])]).nice()
            .range([chartHeight, 0]);

        const g1 = chart.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        g1.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x1));
        g1.append("g")
            .call(d3.axisLeft(y1).ticks(5).tickSizeOuter(0));

        g1.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x1(d[0]))
            .attr("y", d => y1(d[1]))
            .attr("height", d => chartHeight - y1(d[1]))
            .attr("width", x1.bandwidth())
            .attr("fill", "#69b3a2")
            // --- Interactividad para Barras ---
            .on('mouseover', function (event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`<div class="tooltip-label">Producto:</div><div class="tooltip-value">${d[0]}</div><div class="tooltip-label">Ingresos:</div><div class="tooltip-value">$${d[1].toFixed(2)}</div>`)
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

<div id="sales-by-product-chart-svg"></div>