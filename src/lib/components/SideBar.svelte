<script>
    import { createEventDispatcher } from "svelte";

    export let moduloActivo; // Prop para recibir el módulo activo
    const dispatch = createEventDispatcher();

    function seleccionarModulo(modulo) {
        dispatch("moduloSeleccionado", modulo);
    }
</script>

<aside class="sidebar">
    <div class="sidebar-logo">
        <img src="logo-fun.png" alt="Logo Fun" style="display: none;" />
        <h2>Módulos</h2>
    </div>
    <ul class="sidebar-menu" id="moduleSidebarMenu">
        <li>
            <a
                class:active={moduloActivo === "dashboard"}
                on:click={() => seleccionarModulo("dashboard")}
                ><i class="fas fa-tachometer-alt"></i>Dashboard</a
            >
        </li>
        <li>
            <a
                class:active={moduloActivo === "ventas"}
                on:click={() => seleccionarModulo("ventas")}
                ><i class="fas fa-hand-holding-usd"></i>Ventas</a
            >
        </li>
        <li>
            <a
                class:active={moduloActivo === "facturacion"}
                on:click={() => seleccionarModulo("facturacion")}
                ><i class="fas fa-file-invoice"></i>Facturación</a
            >
        </li>
        <li>
            <a
                class:active={moduloActivo === "inventario"}
                on:click={() => seleccionarModulo("inventario")}
                ><i class="fas fa-boxes"></i>Inventario</a
            >
        </li>
        <li>
            <a
                class:active={moduloActivo === "compras"}
                on:click={() => seleccionarModulo("compras")}
                ><i class="fas fa-shopping-cart"></i>Compras</a
            >
        </li>
        <li>
            <a
                class:active={moduloActivo === "fabricacion"}
                on:click={() => seleccionarModulo("fabricacion")}
                ><i class="fas fa-industry"></i>Fabricación</a
            >
        </li>
        <li>
            <a
                class:active={moduloActivo === "empleados"}
                on:click={() => seleccionarModulo("empleados")}
                ><i class="fas fa-user-tie"></i>Empleados</a
            >
        </li>
    </ul>
</aside>

<style>
    /* Sidebar Styles */
    .sidebar {
        width: 220px;
        background-color: var(--sidebar-bg-color);
        backdrop-filter: blur(8px);
        color: var(--sidebar-text-color);
        padding-top: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 90;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
        overflow-y: auto;
        /* Añadido scroll vertical */
    }

    /* Estilos personalizados para la barra de scroll del sidebar */
    .sidebar::-webkit-scrollbar {
        width: var(--sidebar-scroll-width);
    }

    .sidebar::-webkit-scrollbar-track {
        background-color: var(--sidebar-scroll-track-color);
    }

    .sidebar::-webkit-scrollbar-thumb {
        background-color: var(--sidebar-scroll-thumb-color);
        border-radius: var(--sidebar-scroll-border-radius);
    }

    .sidebar-logo {
        padding: 20px;
        text-align: center;
        /* Logo a la izquierda */
        margin-bottom: 25px;
    }

    .sidebar-logo img {
        max-width: 100px;
        height: auto;
        display: none;
        /* Ocultar logo imagen */
    }

    .sidebar-logo h2 {
        color: var(--sidebar-text-color);
        font-weight: bold;
        margin: 0;
        font-size: 1.5em;
        /* Tamaño logo texto */
    }

    .sidebar-menu {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .sidebar-menu li {
        margin-bottom: 3px;
        cursor: pointer;
    }

    .sidebar-menu a {
        display: block;
        padding: 10px 18px;
        text-decoration: none;
        color: var(--sidebar-text-color);
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
        font-size: 0.9em;
        border-radius: 0;
        /* Sin bordes redondeados en items sidebar */
        margin: 0;
        /* Sin margen en items sidebar */
        padding-left: 25px;
        /* Ajuste de padding para alinear texto con icono si se usa */
    }

    .sidebar-menu a:hover,
    .sidebar-menu a.active {
        background-color: var(--sidebar-menu-item-hover-bg-color);
        color: var(--sidebar-menu-item-hover-text-color);
        font-weight: normal;
        /* Normal font weight hover sidebar items */
    }

    .sidebar-menu a.active {
        box-shadow: none;
        /* Sin sombra en item activo sidebar */
        font-weight: bold;
        /* Bold item activo sidebar */
    }

    .sidebar-menu a i {
        margin-right: 10px;
        width: 18px;
        text-align: center;
        display: inline-block;
        opacity: 0.8;
    }

    .sidebar-upgrade {
        display: none;
        /* Ocultar upgrade box */
    }
</style>
