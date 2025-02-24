<script>
    import { onMount } from "svelte";
    import PurchasesByProductChart from "../components/charts/BarChart.svelte";
    import PurchasesOverTimeChart from "../components/charts/LineChart.svelte";
    import PurchasesDistributionChart from "../components/charts/PieChart.svelte";
    import * as d3 from "d3";
    import SalesTable from "../components/Table.svelte";

    // Datos de compras ficticios
    const purchasesData = [
        {
            producto: "Producto D",
            fecha: "2025-02-14",
            cantidad: 200,
            coste: 3000,
        },
        {
            producto: "Producto E",
            fecha: "2025-02-14",
            cantidad: 150,
            coste: 2250,
        },
        {
            producto: "Producto F",
            fecha: "2025-02-13",
            cantidad: 250,
            coste: 3750,
        },
        {
            producto: "Producto D",
            fecha: "2025-02-13",
            cantidad: 180,
            coste: 2700,
        },
        {
            producto: "Producto E",
            fecha: "2025-02-12",
            cantidad: 220,
            coste: 3300,
        },
    ];

    // Datos procesados para gráficas de compras
    const chart1DataCompras = d3.rollup(
        purchasesData,
        (v) => d3.sum(v, (d) => d.coste),
        (d) => d.producto,
    );

    const chart2DataCompras = d3.rollup(
        purchasesData,
        (v) => d3.sum(v, (d) => d.coste),
        (d) => d.fecha,
    );

    const chart3DataCompras = d3.rollup(
        purchasesData,
        (v) => d3.sum(v, (d) => d.cantidad),
        (d) => d.producto,
    );

    // Headers para la tabla de compras
    const purchaseTableHeaders = ["Producto", "Fecha", "Cantidad", "Coste"];
    const purchaseTableRowKeys = ["producto", "fecha", "cantidad", "coste"]; // Define rowKeys for purchases
    const purchaseLink = "Ver todas las compras";

    // Tooltip
    let tooltip;
    onMount(() => {
        tooltip = d3.select("#tooltip");
    });
</script>

<section class="sales-module-section">
    <header class="sales-header">
        <h2>Panel de Compras</h2>
    </header>
    <div class="sales-charts-container">
        <div class="sales-chart">
            <h3>Coste por Producto</h3>
            <PurchasesByProductChart data={chart1DataCompras} {tooltip} />
        </div>
        <div class="sales-chart">
            <h3>Coste a lo largo del tiempo</h3>
            <PurchasesOverTimeChart data={chart2DataCompras} {tooltip} />
        </div>
        <div class="sales-chart">
            <h3>Distribución de Compras por Producto</h3>
            <PurchasesDistributionChart data={chart3DataCompras} {tooltip} />
        </div>
    </div>
    <section class="sales-module-section">
        <div class="sales-data-table-container">
            <h3>Compras Recientes</h3>
            <SalesTable
                salesData={purchasesData}
                headers={purchaseTableHeaders}
                rowKeys={purchaseTableRowKeys}
                viewAllLink={purchaseLink}
            />
        </div>
    </section>
</section>

<div id="tooltip" class="chart-tooltip" style="opacity:0; position: absolute;">
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
