<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    export let data; // Prop para recibir los datos de la gráfica
    export let tooltip; // Prop para pasar el tooltip

    onMount(() => {
        if (!data || data.length === 0) {
            console.warn("No data provided to FabricacionOverTimeChart.");
            return; // Salir si no hay datos
        }

        const margin = { top: 20, right: 30, bottom: 30, left: 60 };
        const chartWidth = 300 - margin.left - margin.right;
        const chartHeight = 200 - margin.top - margin.bottom;

        const svg = d3.select("#fabricacion-over-time-chart-svg")
            .append("svg")
            .attr("width", "100%")
            .attr("height", 200);

        const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;


        // Escalas
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.fecha))) // Usar 'fecha' del objeto de datos
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.cantidad)]).nice() // Usar 'cantidad' del objeto de datos
            .range([chartHeight, 0]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Área bajo la línea
        g.append("path")
            .datum(data)
            .attr("fill", "#cce5df") // Color de relleno del área
            .attr("stroke", "#69b3a2") // Color del borde de la línea
            .attr("stroke-width", 1.5)
            .attr("d", d3.area()
                .x(d => x(new Date(d.fecha)))
                .y0(y(0))
                .y1(d => y(d.cantidad))
            );

        // Ejes
        g.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y).ticks(3));

         // Puntos sobre la línea
        g.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(new Date(d.fecha)))
            .attr("cy", d => y(d.cantidad))
            .attr("r", 3) // Radio de los puntos,
            .attr("fill", "#69b3a2")
            .attr("stroke", "#ffffff") // Borde blanco para resaltar los puntos
            .attr("stroke-width", 1)
            // --- Interactividad para Puntos
            .on('mouseover', function (event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`<div class="tooltip-label">Fecha:</div><div class="tooltip-value">${d.fecha}</div><div class="tooltip-label">Producción:</div><div class="tooltip-value">${d.cantidad}</div>`)
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

<div id="fabricacion-over-time-chart-svg"></div>

<style>
    /* Estilos específicos para la gráfica de área de fabricación */
    #fabricacion-over-time-chart-svg {
        overflow: visible; /* Asegurar que el tooltip no se recorte */
        margin-top: 100px;
    }

    .dot { /* Estilo para los puntos sobre la línea */
       opacity: 0.7; /* Ligeramente transparentes */
    }
</style>