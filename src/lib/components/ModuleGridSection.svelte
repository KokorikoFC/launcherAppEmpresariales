<script>
    import ModuleIcon from "./ModuleIcon.svelte";
    import { userRole } from "../stores/userRoleStore"; // Import userRole store
    export let searchInput = ""; // Prop for the buscador

    const allModules = [
        // Define all modules for admin
        {
            name: "Ventas",
            description: "Gestiona el proceso de ventas",
            iconClass: "fas fa-shopping-cart",
        },
        {
            name: "Facturación",
            description: "Crea y envía facturas a clientes",
            iconClass: "fas fa-file-invoice-dollar",
        },
        {
            name: "Inventario",
            description: "Controla el stock de productos",
            iconClass: "fas fa-warehouse",
        },
        {
            name: "RR. HH.",
            description: "Gestiona empleados y nóminas de forma eficiente",
            iconClass: "fas fa-users",
        },
        {
            name: "Informes",
            description: "Genera informes personalizados y detallados",
            iconClass: "fas fa-chart-bar",
        },
        {
            name: "Configuración",
            description: "Ajustes generales del sistema",
            iconClass: "fas fa-cog",
        },
        {
            name: "Proyectos",
            description: "Administra proyectos y tareas con facilidad",
            iconClass: "fas fa-project-diagram",
        },
        {
            name: "Calendario",
            description: "Organiza tu agenda y eventos",
            iconClass: "fas fa-calendar-alt",
        },
        {
            name: "CRM",
            description: "Gestiona relaciones con clientes y prospectos",
            iconClass: "fas fa-user-tie",
        },
        {
            name: "Marketing",
            description: "Crea campañas de marketing efectivas",
            iconClass: "fas fa-envelope-open-text",
        },
        {
            name: "Analítica",
            description: "Analiza datos y métricas clave",
            iconClass: "fas fa-chart-line",
        },
        {
            name: "Ventas",
            description: "Impulsa tus ventas y conversiones",
            iconClass: "fas fa-funnel-dollar",
        },
        {
            name: "Formación",
            description: "Gestiona programas de formación y cursos",
            iconClass: "fas fa-graduation-cap",
        },
        {
            name: "Soporte",
            description: "Ofrece atención al cliente de calidad",
            iconClass: "fas fa-hand-holding-heart",
        },
        {
            name: "Internacional",
            description: "Expande tu negocio a nivel global",
            iconClass: "fas fa-globe",
        },
        {
            name: "Redes",
            description: "Gestiona tus redes y contactos profesionales",
            iconClass: "fas fa-network-wired",
        },
    ];

    const userModules = allModules.slice(0, 8); // Modules up to 'Calendario' (index 7)

    $: filteredModules = searchInput
        ? (() => {
            const currentModules =
                $userRole === "administrator" ? allModules : userModules;
            return currentModules.filter((module) =>
                module.name.toLowerCase().includes(searchInput.toLowerCase()),
            );
        })()
        : $userRole === "administrator"
        ? allModules
        : userModules;
</script>

<section class="module-grid-section" id="cardContainer">
    {#each filteredModules as module}
        <ModuleIcon
            moduleName={module.name}
            moduleDescription={module.description}
            iconClass={module.iconClass}
        />
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
