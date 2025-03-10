<script>
    import EmployeeCard from "../components/EmployeeCard.svelte"; // Importa el componente

    // Datos de empleados 
    const empleadosData = [
    {
        nombre: "Carlos Pérez",
        puesto: "Recepcionista",
        email: "carlos.perez@ejemplo.es",
        telefono: "657 890 123",
        fotoUrl: "src/assets/img/employee-1.png",
    },
    {
        nombre: "María López",
        puesto: "Técnico de RRHH",
        email: "maria.lopez@ejemplo.es",
        telefono: "666 555 444",
        fotoUrl: "src/assets/img/employee-2.png",
    },
    {
        nombre: "Ana Martínez",
        puesto: "Contable",
        email: "ana.martinez@ejemplo.es",
        telefono: "712 345 678",
        fotoUrl: "src/assets/img/employee-3.png",
    },
    {
        nombre: "Juan Martínez",
        puesto: "Responsable de Marketing",
        email: "juan.martinez@ejemplo.es",
        telefono: "609 876 543",
        fotoUrl: "src/assets/img/employee-4.png",
    },
    {
        nombre: "Pedro García",
        puesto: "Directora Comercial",
        email: "pedro.garcia@ejemplo.es",
        telefono: "678 901 234",
        fotoUrl: "src/assets/img/employee-5.png",
    },
    {
        nombre: "Natasha Reddy",
        puesto: "Programador Informático",
        email: "natasha.reddy@ejemplo.es",
        telefono: "722 333 444",
        fotoUrl: "src/assets/img/employee-6.png",
    },
    {
        nombre: "Hajra Khan",
        puesto: "Diseñadora Gráfica",
        email: "hajra.khan@ejemplo.es",
        telefono: "633 444 555",
        fotoUrl: "src/assets/img/employee-7.png",
    },
    {
        nombre: "Luisa Fernández",
        puesto: "Administrativo",
        email: "luisa.fernandez@ejemplo.es",
        telefono: "699 000 111",
        fotoUrl: "src/assets/img/employee-8.png",
    },
    {
        nombre: "Jayden Smith",
        puesto: "Personal de Limpieza",
        email: "jayden.smith@ejemplo.es",
        telefono: "744 555 666",
        fotoUrl: "src/assets/img/employee-9.jpg",
    },

];
</script>

<section class="employees-module-section">
    <header class="employees-header">
        <h2>Módulo de Empleados</h2>
    </header>

    <div class="employees-cards-container">
        {#each empleadosData as empleado}
            <EmployeeCard {empleado} />
        {/each}
    </div>
</section>

<style>
    /* styles/empleados-module.css - Estilos específicos para el módulo contenedor (opcional) */
    .employees-module-section {
        padding: 20px;
        background-color: var(
            --card-bg-color
        ); /* Usa variable de inventario - Asume que estas variables CSS están definidas globalmente */
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }

    .employees-header {
        color: var(
            --card-heading-color
        ); /* Usa variable de inventario - Asume que estas variables CSS están definidas globalmente */
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px dashed var(--header-border-color); /* Usa variable de inventario - Asume que estas variables CSS están definidas globalmente */
    }

    .employees-header h2 {
        font-size: 1.6em;
        margin: 0;
        font-weight: 600;
    }

    /* Container de Tarjetas de Empleados */
    .employees-cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-template-columns: repeat(
            3,
            minmax(300px, 1fr)
        ); /* 3 tarjetas por fila */
        gap: 20px;
    }
</style>
