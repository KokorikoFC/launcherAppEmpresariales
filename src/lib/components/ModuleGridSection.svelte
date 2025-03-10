<script>
    import ModuleIcon from "./ModuleIcon.svelte";
    import { userRole } from "../stores/userRoleStore"; // Import userRole store
    export let searchInput = ""; // Prop for the buscador
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher(); // Crear dispatcher

    const allModules = [
        // Define all modules for admin
        {
            name: "Ventas",
            name_active: "ventas",
            description: "Gestiona el proceso de ventas y clientes",
            iconClass: "fas fa-hand-holding-usd", // Icon class as string
        },
        {
            name: "Facturación",
            name_active: "facturacion",
            description: "Crea y gestiona facturas y pagos",
            iconClass: "fas fa-file-invoice", // Icon class as string
        },
        {
            name: "Inventario",
            name_active: "inventario",
            description: "Control y gestión de stock de productos",
            iconClass: "fas fa-boxes", // Icon class as string
        },
        {
            name: "Compras",
            name_active: "compras",
            description: "Gestiona órdenes de compra a proveedores",
            iconClass: "fas fa-shopping-cart", 
        },
        {
            name: "Fabricación",
            name_active: "fabricacion",
            description: "Control de procesos de fabricación",
            iconClass: "fas fa-industry", 
        },
        {
            name: "Empleados",
            name_active: "empleados",
            description: "Gestión de información del personal",
            iconClass: "fas fa-user-tie", 
        },
        {
            name: "Informes",
            description: "Generación de informes y análisis de datos",
            iconClass: "fas fa-chart-bar", 
        },
        {
            name: "Proyectos",
            description: "Planificación y seguimiento de proyectos",
            iconClass: "fas fa-project-diagram", 
        },
        {
            name: "Calendario",
            description: "Organización de eventos y agenda",
            iconClass: "fas fa-calendar-alt", 
        },
        {
            name: "CRM",
            description: "Gestión de Relaciones con Clientes (CRM)",
            iconClass: "fas fa-users",
        },
        {
            name: "Marketing",
            description: "Creación y gestión de campañas de marketing",
            iconClass: "fas fa-bullhorn", 
        },
        {
            name: "Analítica",
            description: "Análisis de métricas e indicadores clave",
            iconClass: "fas fa-chart-line", 
        },
        {
            name: "Formación",
            description: "Gestión de programas de formación interna",
            iconClass: "fas fa-graduation-cap", 
        },
        {
            name: "Soporte",
            description: "Atención y soporte al cliente",
            iconClass: "fas fa-headset", 
        },
        {
            name: "Internacional",
            description: "Gestión de operaciones internacionales",
            iconClass: "fas fa-globe", 
        },
        {
            name: "Redes",
            description: "Gestión de redes profesionales y contactos",
            iconClass: "fas fa-share-alt", 
        },
    ];

    const userModules = allModules.slice(0, 8); // Modules up to 'Calendario' (index 7)

    $: filteredModules = searchInput
        ? (() => {
              const currentModules =
                  $userRole === "administrador" ? allModules : userModules;
              return currentModules.filter((module) =>
                  module.name.toLowerCase().includes(searchInput.toLowerCase()),
              );
          })()
        : $userRole === "administrador"
          ? allModules
          : userModules;
</script>

<section class="module-grid-section" id="cardContainer">
    {#each filteredModules as module}
        <div
            on:click={() => dispatch("moduloSeleccionado", module.name_active)}
            style="cursor: pointer;"
        >
            <ModuleIcon
                moduleName={module.name}
                moduleDescription={module.description}
                iconClass={module.iconClass}
            />
        </div>
    {/each}
</section>

<style>
    .module-grid-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 25px;
        position: relative;
        z-index: 1;
    }
</style>
