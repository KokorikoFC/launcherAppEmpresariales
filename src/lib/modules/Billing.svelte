<script>
    import SalesTable from "../components/Table.svelte";
    import * as d3 from "d3";
    import { onMount } from "svelte";

    // Datos de facturación ficticios
    const facturaData = [
        {
            id: 1,
            numeroFactura: "FAC-2025-001",
            fechaFactura: "2025-02-19",
            cliente: "ElectroT",
            total: "1500 €",
            estadoFactura: "Pendiente",
        },
        {
            id: 2,
            numeroFactura: "FAC-2025-002",
            fechaFactura: "2025-02-18",
            cliente: "Moda Bella",
            total: "2200 €",
            estadoFactura: "Pagada",
        },
        {
            id: 3,
            numeroFactura: "FAC-2025-003",
            fechaFactura: "2025-02-17",
            cliente: "Hogar Feliz",
            total: "850 €",
            estadoFactura: "Pagada",
        },
        {
            id: 4,
            numeroFactura: "FAC-2025-004",
            fechaFactura: "2025-02-16",
            cliente: "Oficina Eficaz",
            total: "3100 €",
            estadoFactura: "Pendiente",
        },
        {
            id: 5,
            numeroFactura: "FAC-2025-005",
            fechaFactura: "2025-02-15",
            cliente: "Papelería",
            total: "1950 €",
            estadoFactura: "Pagada",
        },
    ];

    // Headers para la tabla de facturación (igual que antes)
    const facturaTableHeaders = [
        "Número Factura",
        "Fecha",
        "Cliente",
        "Total",
        "Estado",
    ];
    const facturaTableRowKeys = [
        "numeroFactura",
        "fechaFactura",
        "cliente",
        "total",
        "estadoFactura",
    ];
    const facturaLink = "Ver todas las facturas";

    let timelineContainerNode;

    onMount(drawTimeline);

    function drawTimeline() {
        if (!facturaData || facturaData.length === 0 || !timelineContainerNode)
            return;

        d3.select(timelineContainerNode).select("svg").remove(); // Limpiar SVG anterior

        const margin = { top: 20, right: 30, bottom: 70, left: 30 }; // Margen inferior más grande para etiquetas del eje X
        const width =
            timelineContainerNode.offsetWidth - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom; // Altura reducida para el timeline

        const svg = d3
            .select(timelineContainerNode)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleTime()
            .domain(d3.extent(facturaData, (d) => new Date(d.fechaFactura)))
            .range([0, width]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d-%m"))); // Formato de fecha más corto en el eje X

        const y = d3
            .scaleLinear()
            .domain([0, 1]) // Rango fijo para el eje Y del timeline
            .range([height, 0]);

        // Línea del timeline
        svg.append("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", y(0.5)) // Centrado verticalmente
            .attr("y2", y(0.5))
            .attr("stroke", "var(--timeline-line-color)") // Variable CSS para color de línea
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4 4"); // Línea punteada

        // Círculos para los eventos (facturas)
        svg.selectAll(".factura-event")
            .data(facturaData)
            .enter()
            .append("circle")
            .attr("class", "factura-event")
            .attr("cx", (d) => x(new Date(d.fechaFactura)))
            .attr("cy", y(0.5)) // Centrado verticalmente en la línea
            .attr("r", 8)
            .attr("fill", "var(--timeline-event-color)") // Variable CSS para color de eventos
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("r", 10)
                    .attr(
                        "fill",
                        d3.color("var(--timeline-event-color)")?.darker(1) ||
                            "#0056b3",
                    ); // Color por defecto si la variable CSS falla
                
            })
            .on("mouseout", function () {
                d3.select(this)
                    .attr("r", 8)
                    .attr("fill", "var(--timeline-event-color)");
            });

        // Etiquetas debajo de los círculos
        svg.selectAll(".factura-label")
            .data(facturaData)
            .enter()
            .append("text")
            .attr("class", "factura-label")
            .attr("x", (d) => x(new Date(d.fechaFactura)))
            .attr("y", y(0.5) + 20) // Posición debajo del círculo
            .style("text-anchor", "middle")
            .style("font-size", "0.8em")
            .style("fill", "var(--timeline-label-text-color)") // Variable CSS para color de texto de etiquetas
            .text((d) => d.cliente); // Muestra el cliente como etiqueta
    }
</script>

<section class="facturacion-module-section-original">
    <header class="facturacion-header-original">
        <h2>Facturación Reciente</h2>
    </header>

    <div class="facturacion-timeline-container-original">
        <h3>Timeline de Facturas</h3>
        <div
            class="timeline-chart-original"
            bind:this={timelineContainerNode}
        ></div>
    </div>

    <div class="facturacion-key-metrics-original">
        <div class="metric-box-original metric-box-revenue-original">
            <h3>Ingresos Totales</h3>
            <div class="metric-value">
                <i class="icon-revenue"></i>
                <span class="currency">15.000€</span>
            </div>
        </div>
        <div class="metric-box-original metric-box-pending-original">
            <h3>Pendientes de Pago</h3>
            <div class="metric-value">
                <i class="icon-pending"></i>
                <span class="currency">2.500€</span>
            </div>
        </div>
    </div>

    <section class="facturacion-module-section-original">
        <div class="sales-data-table-container">
            <h3>Facturas Detalladas</h3>
            <SalesTable
                salesData={facturaData}
                headers={facturaTableHeaders}
                rowKeys={facturaTableRowKeys}
                viewAllLink={facturaLink}
            />
        </div>
    </section>
</section>

<style>
    .facturacion-module-section-original {
        padding: 20px;
        background-color: var(--card-bg-color);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }

    .facturacion-header-original {
        color: var(--card-heading-color);
        border-bottom: 1px dashed var(--header-border-color);
        padding-bottom: 15px;
        margin-bottom: 20px;
    }

    .facturacion-header-original h2 {
        margin: 0;
        font-size: 1.6em;
        font-weight: 600;
    }

    /* Timeline Container */
    .facturacion-timeline-container-original {
        background-color: var(--timeline-container-bg-color);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.08);
        margin-bottom: 30px;
    }

    .facturacion-timeline-container-original h3 {
        color: var(--timeline-heading-color);
        font-size: 1.4em;
        margin-top: 0;
        margin-bottom: 20px;
        font-weight: 600;
    }

    .timeline-chart-original {
        width: 100%;
        height: 200px; /* Altura fija para el timeline */
    }

    
    .facturacion-key-metrics-original {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* 2 columnas de igual ancho */
        gap: 25px;
        margin-bottom: 35px;
    }

    .metric-box-original {
        background-color: var(
            --metric-box-bg-color
        ); 
        border-radius: 25px;
        padding: 30px;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.08);
    }

    .metric-box-revenue-original {
        border-top: 8px solid var(--revenue-metric-color);
    }

    .metric-box-pending-original {
        border-top: 8px solid var(--pending-metric-color);
    }

    .sales-data-table-container h3 {
        color: var(--card-heading-color);
        font-size: 1.3em;
        margin-top: 0;
        margin-bottom: 25px;
        font-weight: 600;
    }
    
    .currency {
        font-size: 1.2em;
        font-weight: 600;
    }

</style>
