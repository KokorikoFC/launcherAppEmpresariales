<script>
    import SalesTable from "../components/Table.svelte";

    // Datos de inventario ficticios
    const inventoryData = [
        {
            producto: "Laptop",
            categoria: "Electrónica",
            stock: 50,
            precioUnitario: "1200 €",
            ultimaActualizacion: "2025-02-14",
            estado: "Disponible",
        },
        {
            producto: "Monitor",
            categoria: "Electrónica",
            stock: 15,
            precioUnitario: "300 €",
            ultimaActualizacion: "2025-02-14",
            estado: "Stock Bajo",
        },
        {
            producto: "Teclado",
            categoria: "Electrónica",
            stock: 200,
            precioUnitario: "75 €",
            ultimaActualizacion: "2025-02-13",
            estado: "Disponible",
        },
        {
            producto: "Mouse",
            categoria: "Electrónica",
            stock: 180,
            precioUnitario: "50 €",
            ultimaActualizacion: "2025-02-13",
            estado: "Disponible",
        },
        {
            producto: "Silla Oficina",
            categoria: "Mobiliario",
            stock: 10,
            precioUnitario: "250 €",
            ultimaActualizacion: "2025-02-12",
            estado: "Stock Bajo",
        },
        {
            producto: "Escritorio",
            categoria: "Mobiliario",
            stock: 5,
            precioUnitario: "400 €",
            ultimaActualizacion: "2025-02-12",
            estado: "Sin Stock",
        },
        {
            producto: "Impresora",
            categoria: "Oficina",
            stock: 30,
            precioUnitario: "150 €",
            ultimaActualizacion: "2025-02-11",
            estado: "Disponible",
        },
        {
            producto: "Papel Resma",
            categoria: "Oficina",
            stock: 500,
            precioUnitario: "25 €",
            ultimaActualizacion: "2025-02-11",
            estado: "Disponible",
        },
        {
            producto: "Bolígrafo",
            categoria: "Papelería",
            stock: 1000,
            precioUnitario: "1 €",
            ultimaActualizacion: "2025-02-10",
            estado: "Disponible",
        },
        {
            producto: "Carpeta",
            categoria: "Papelería",
            stock: 300,
            precioUnitario: "5 €",
            ultimaActualizacion: "2025-02-10",
            estado: "Disponible",
        },
    ];

    // Headers para la tabla de inventario
    const inventoryTableHeaders = [
        "Producto",
        "Categoría",
        "Stock",
        "Precio Unitario",
        "Última Actualización",
        "Estado",
    ];
    const inventoryTableRowKeys = [
        "producto",
        "categoria",
        "stock",
        "precioUnitario",
        "ultimaActualizacion",
        "estado",
    ];
    const inventoryLink = "Ver todo el inventario";
</script>

<section class="inventory-module-section">
    <header class="inventory-header">
        <h2>Panel de Inventario</h2>
    </header>

    <div class="inventory-overview-cards-container">
        <div class="inventory-overview-card">
            <i class="fas fa-box-open card-icon"></i>
            <div class="card-info">
                <h3>Total de Productos</h3>
                <span class="card-value" id="total-products">350</span>
            </div>
        </div>
        <div class="inventory-overview-card">
            <i class="fas fa-exclamation-triangle card-icon low-stock"></i>
            <div class="card-info">
                <h3>Productos Bajo Stock</h3>
                <span class="card-value" id="low-stock-products">25</span>
            </div>
        </div>
        <div class="inventory-overview-card">
            <i class="fas fa-clipboard-check card-icon"></i>
            <div class="card-info">
                <h3>Categorías</h3>
                <span class="card-value" id="total-categories">12</span>
            </div>
        </div>
    </div>

    <div class="inventory-data-table-container">
        <h3>Listado de Inventario</h3>
        <SalesTable
            salesData={inventoryData}
            headers={inventoryTableHeaders}
            rowKeys={inventoryTableRowKeys}
            viewAllLink={inventoryLink}
        />
    </div>
</section>

<style>
    /* styles/inventario.css - Aplicando los estilos proporcionados */
    .inventory-module-section {
        padding: 20px;
        background-color: var(--card-bg-color);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }

    .inventory-header {
        color: var(--card-heading-color);
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px dashed var(--header-border-color);
    }

    .inventory-header h2 {
        font-size: 1.6em;
        margin: 0;
        font-weight: 600;
    }

    /* Overview Cards Container */
    .inventory-overview-cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin-bottom: 25px;
    }

    .inventory-overview-card {
        background-color: var(--sidebar-bg-color);
        backdrop-filter: blur(8px);
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        gap: 20px;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .inventory-overview-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    }

    .inventory-overview-card .card-icon {
        font-size: 2.5em;
        color: var(--module-icon-main-color);
        opacity: 0.8;
    }

    .inventory-overview-card .card-icon.low-stock {
        color: #ff9800; /* Naranja para bajo stock */
    }

    .inventory-overview-card .card-info h3 {
        color: var(--card-heading-color);
        font-size: 1.2em;
        margin: 0 0 5px 0;
        font-weight: 600;
    }

    .inventory-overview-card .card-info .card-value {
        font-size: 1.5em;
        font-weight: bold;
        color: var(--main-content-text-color);
    }

    /* Inventory Data Table Section */
    .inventory-data-table-container {
        background-color: var(--card-bg-color);
        backdrop-filter: blur(8px);
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        border: none;
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
    }

    .inventory-data-table-container h3 {
        color: var(--card-heading-color);
        font-size: 1.3em;
        margin-top: 0;
        margin-bottom: 25px;
        font-weight: 600;
    }
</style>