<script>
    import { onMount } from "svelte";
    import SalesByProductChart from "../components/charts/BarChart.svelte";
    import SalesOverTimeChart from "../components/charts/LineChart.svelte";
    import SalesDistributionChart from "../components/charts/PieChart.svelte";
    import * as d3 from "d3"; // Import D3 solo para rollup y tooltip
    import SalesTable from "../components/Table.svelte"; // Import the SalesTable component

    // Datos de ventas ficticios (puedes mover esto a un store o servicio)
    const salesData = [
        {
            producto: "PS5",
            fecha: "2025-02-14",
            cantidad: 150,
            ingresos: 7500,
        },
        {
            producto: "Mesa Negra",
            fecha: "2025-02-14",
            cantidad: 200,
            ingresos: 12000,
        },
        {
            producto: "Intel i9",
            fecha: "2025-02-13",
            cantidad: 100,
            ingresos: 5000,
        },
        {
            producto: "Iphone 14",
            fecha: "2025-02-13",
            cantidad: 120,
            ingresos: 6000,
        },
        {
            producto: "Monitor LG",
            fecha: "2025-02-12",
            cantidad: 180,
            ingresos: 10800,
        },
    ];

    const tableHeaders = ["Producto", "Fecha", "Cantidad", "Ingresos"];
    const salesTableRowKeys = ["producto", "fecha", "cantidad", "ingresos"];
    const saleLink = "Ver todas las ventas";

    // Datos procesados para cada gráfica (rollup aquí en VentasScreen)
    const chart1Data = d3.rollup(
        salesData,
        (v) => d3.sum(v, (d) => d.ingresos),
        (d) => d.producto,
    );
    const chart2Data = d3.rollup(
        salesData,
        (v) => d3.sum(v, (d) => d.ingresos),
        (d) => d.fecha,
    );
    const chart3Data = d3.rollup(
        salesData,
        (v) => d3.sum(v, (d) => d.cantidad),
        (d) => d.producto,
    );

    // Tooltip (definido en VentasScreen y pasado a los componentes de gráfica)
    let tooltip;
    onMount(() => {
        tooltip = d3.select("#tooltip");
    });
</script>

<section class="sales-module-section">
    <header class="sales-header">
        <h2>Panel de Ventas</h2>
    </header>
    <div class="sales-charts-container">
        <div class="sales-chart">
            <h3>Ingresos por Producto</h3>
            <SalesByProductChart data={chart1Data} {tooltip} />
        </div>
        <div class="sales-chart">
            <h3>Ingresos a lo largo del tiempo</h3>
            <SalesOverTimeChart data={chart2Data} {tooltip} />
        </div>
        <div class="sales-chart">
            <h3>Distribución de Ventas por Producto</h3>
            <SalesDistributionChart data={chart3Data} {tooltip} />
        </div>
    </div>
    <section class="sales-module-section">
        <div class="sales-data-table-container">
            <h3>Ventas Recientes</h3>
            <SalesTable salesData={salesData} headers={tableHeaders} rowKeys={salesTableRowKeys} viewAllLink={saleLink}/>
        </div>
    </section>

</section>

<div
        id="tooltip"
        class="chart-tooltip"
        style="opacity:0; position: absolute;"
    >
        <div class="tooltip-label"></div>
        <div class="tooltip-value"></div>
    </div>

<style>

    /* Ventas Module Section Styles */
    .sales-module-section {
        padding: 20px;
        background-color: var(--card-bg-color);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }

    .sales-header {
        color: var(--card-heading-color);
        border-bottom: 1px dashed var(--header-border-color);
        padding-bottom: 15px;
        margin-bottom: 20px;
    }

    .sales-header h2 {
        margin: 0;
        font-size: 1.6em;
        font-weight: 600;
    }

    .sales-charts-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
        margin-bottom: 30px;
    }

    .sales-chart {
        background-color: var(--module-icon-bg-color);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }

    .sales-chart h3 {
        color: var(--module-info-main-text-color);
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 1.1em;
        font-weight: 500;
        text-align: center;
    }

    /* Sales Data Table Section */

    .sales-data-table-container h3 {
        color: var(--card-heading-color);
        font-size: 1.3em;
        margin-top: 0;
        margin-bottom: 25px;
        font-weight: 600;
    }

    .sales-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95em;
    }

    /* Estilos para el tooltip */
    .chart-tooltip {
        background-color: rgba(50, 50, 50, 0.9);
        color: #fff;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 0.9em;
        pointer-events: none; /* Permite interactuar con elementos debajo */
        z-index: 10; /* Asegura que el tooltip esté sobre otros elementos */
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .chart-tooltip .tooltip-label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .chart-tooltip .tooltip-value {
        font-style: italic;
    }
    
</style>
