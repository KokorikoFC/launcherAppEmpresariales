<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    // Importar los COMPONENTES DE GRÁFICAS DE COMPRAS (reutilización!)
    import PurchasesByProductChart from '../components/charts/BarChart.svelte';
    import PurchasesOverTimeChart from '../components/charts/FabricacionOverTimeChart.svelte';
    import PurchasesDistributionChart from '../components/charts/PieChart.svelte';


    // Datos de fabricación ficticios (IGUALES QUE ANTES)
    const fabricacionData = {
        produccionVsObjetivo: [
            { tipo: "Producido", cantidad: 2850 },
            { tipo: "Objetivo", cantidad: 3500 }
        ],
        ordenesCompletadasVsPendientes: [
            { estado: "Completadas", cantidad: 15 },
            { estado: "Pendientes", cantidad: 5 }
        ],
        produccionPorCategoria: [
            { categoria: "Electrónica", cantidad: 1200, coste: 1500 }, // Añadido coste ficticio
            { categoria: "Mecánica", cantidad: 950, coste: 1100 },   // Añadido coste ficticio
            { categoria: "Textil", cantidad: 700, coste: 800 }     // Añadido coste ficticio
        ],
        ordenesFabricacion: [
            { idOrden: "OF-2025-001", producto: "Silla de oficina", fechaInicio: "2025-02-15", estado: "En Proceso", progreso: 60 },
            { idOrden: "OF-2025-002", producto: "Mesa de Roble", fechaInicio: "2025-02-18", estado: "Pendiente", progreso: 20 },
            { idOrden: "OF-2025-003", producto: "Sofá Cama", fechaInicio: "2025-02-19", estado: "Completada", progreso: 100 },
            { idOrden: "OF-2025-004", producto: "Estantería Metálica", fechaInicio: "2025-02-19", estado: "En Proceso", progreso: 85 }
        ]
    };


    // Datos PROCESADOS PARA GRÁFICAS DE FABRICACIÓN - REUTILIZANDO NOMBRES DE VARIABLES DEL EJEMPLO DE COMPRAS
    const chart1DataCompras = d3.rollup(  // Reutilizando "chart1DataCompras" - ahora para Coste de Fabricación por Categoría
        fabricacionData.produccionPorCategoria,
        (v) => d3.sum(v, (d) => d.coste), // Sumar costes por categoría
        (d) => d.categoria,
    );

    const chart2DataCompras = [ // Reutilizando "chart2DataCompras" - ahora para Producción en el Tiempo - DATOS FICTICIOS LIMITADOS
        { fecha: "2025-02-17", cantidad: 1730 },
        { fecha: "2025-02-18", cantidad: 1260 },
        { fecha: "2025-02-19", cantidad: 2850 } // Fecha actual - dato de "Producido"
    ];


    const chart3DataCompras = d3.rollup(  // Reutilizando "chart3DataCompras" - ahora para Distribución de Producción por Categoría
        fabricacionData.produccionPorCategoria,
        (v) => d3.sum(v, (d) => d.cantidad), // Sumar cantidades por categoría
        (d) => d.categoria,
    );


    // Tooltip
    let tooltip;
    onMount(() => {
        tooltip = d3.select("#tooltip");
    });


</script>

<section class="fabricacion-module-section-original">
    <header class="facturacion-header-original fabricacion-header-original">
        <h2>Producción y Fabricación</h2>
    </header>

    <div class="fabricacion-charts-container-original">
        <div class="sales-chart">
            <h3>Coste de Fabricación por Categoría</h3>
            <PurchasesByProductChart data={chart1DataCompras} tooltip={tooltip} />
        </div>
        <div class="sales-chart">
            <h3>Producción a lo largo del tiempo</h3>
            <PurchasesOverTimeChart data={chart2DataCompras} tooltip={tooltip} />
        </div>
        <div class="sales-chart">
            <h3>Distribución de Producción por Categoría</h3>
            <PurchasesDistributionChart data={chart3DataCompras} tooltip={tooltip} />
        </div>
    </div>


    <div class="fabricacion-ordenes-container-original">
        <h3>Órdenes de Fabricación Recientes</h3>
        <ul class="ordenes-list-original">
            {#each fabricacionData.ordenesFabricacion as orden (orden.idOrden)}
                <li class="orden-item-original">
                    <div class="orden-card-original">
                        <div class="orden-header-card-original">
                            <span class="orden-id-card-original">{orden.idOrden}</span>
                            <span class="orden-producto-card-original">Producto: {orden.producto}</span>
                        </div>
                        <div class="orden-details-card-original">
                            <span class="orden-fecha-card-original">Inicio: {orden.fechaInicio}</span>
                            <span class="orden-estado-card-original">
                                {#if orden.estado === 'Pendiente'}
                                    <i class="fas fa-clock orden-estado-icon-original pendiente"></i>
                                {:else if orden.estado === 'En Proceso'}
                                    <i class="fas fa-cog fa-spin orden-estado-icon-original en-proceso"></i>
                                {:else if orden.estado === 'Completada'}
                                    <i class="fas fa-check-circle orden-estado-icon-original completada"></i>
                                {/if}
                                Estado: {orden.estado}
                            </span>
                        </div>
                        <div class="orden-progress-bar-card-original">
                            <div class="progress-bar-fill-card-original" style="width: {orden.progreso}%"></div>
                            <span class="progress-percentage-card-original">{orden.progreso}%</span>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
        <p class="view-all-ordenes-link-original">Ver todas las órdenes de fabricación</p>
    </div>
</section>

<div id="tooltip" class="chart-tooltip" style="opacity:0; position: absolute;">
    <div class="tooltip-label"></div>
    <div class="tooltip-value"></div>
</div>


<style>

    .fabricacion-module-section-original {
        padding: 20px;
        background-color: var(--card-bg-color);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }

    .fabricacion-header-original {
        color: var(--card-heading-color);
        border-bottom: 1px dashed var(--header-border-color);
        padding-bottom: 15px;
        margin-bottom: 20px;
    }

    .fabricacion-header-original h2 {
        margin: 0;
        font-size: 1.6em;
        font-weight: 600;
    }

    /* Charts Container - Ahora para 3 gráficos en estilo "sales-chart" */
    .fabricacion-charts-container-original {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 3 columnas */
        gap: 25px;
        margin-bottom: 30px;
    }

    .sales-chart { /* Estilo para los contenedores de las gráficas -  ADAPTADO DEL EJEMPLO */
        background-color: var(--chart-box-bg-color);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 20px; /* Reducir un poco el padding */
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.08);
    }

    .sales-chart h3 { /* Estilo para los títulos de las gráficas - ADAPTADO DEL EJEMPLO */
        color: var(--chart-heading-color);
        font-size: 1.2em; /* Reducir un poco el tamaño de fuente del título */
        margin-top: 0;
        margin-bottom: 10px; /* Reducir margen inferior del título */
        font-weight: 600;
        text-align: left; /* Alinear a la izquierda como en el ejemplo */
    }


    /* Ordenes Container - SIN CAMBIOS */
    .fabricacion-ordenes-container-original {
        background-color: var(--ordenes-container-bg-color);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }

    .fabricacion-ordenes-container-original h3 {
        color: var(--ordenes-heading-color);
        font-size: 1.5em;
        margin-top: 0;
        margin-bottom: 30px;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .ordenes-list-original {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .orden-item-original {
        margin-bottom: 15px;
    }

    .orden-card-original {
        background-color: var(--orden-card-bg-color);
        border-radius: 22px;
        padding: 20px 25px;
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.08);
        border-left: 5px solid var(--orden-card-border-color);
        transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    }

    .orden-card-original:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        background-color: var(--orden-card-bg-hover-color);
    }


    .orden-header-card-original {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px dashed var(--orden-card-header-border-color);
    }

    .orden-id-card-original {
        font-size: 1.1em;
        font-weight: 700;
        color: var(--orden-card-id-text-color);
    }

    .orden-producto-card-original {
        font-size: 0.95em;
        color: var(--orden-card-producto-text-color);
        font-style: italic;
    }

    .orden-details-card-original {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .orden-fecha-card-original, .orden-estado-card-original {
        font-size: 0.9em;
        color: var(--orden-card-details-text-color);
    }

    .orden-estado-icon-original {
        margin-right: 8px;
        font-size: 0.9em;
        vertical-align: middle;
    }

    .orden-estado-icon-original.pendiente {
        color: var(--orden-estado-pendiente-color);
    }
    .orden-estado-icon-original.en-proceso {
        color: var(--orden-estado-en-proceso-color);
    }
    .orden-estado-icon-original.completada {
        color: var(--orden-estado-completada-color);
    }


    .orden-progress-bar-card-original {
        background-color: var(--progress-bar-card-bg-color);
        border-radius: 10px;
        height: 12px;
        position: relative;
        overflow: hidden;
    }

    .progress-bar-fill-card-original {
        background-color: var(--progress-bar-card-fill-color);
        height: 100%;
        border-radius: 10px;
        transition: width 0.4s ease;
    }

    .progress-percentage-card-original {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.8em;
        font-weight: 600;
        color: rgb(66, 66, 66);
    }


    .view-all-ordenes-link-original {
        display: block;
        text-align: right;
        margin-top: 25px;
        text-decoration: none;
        color: blue;
        text-decoration: none;
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