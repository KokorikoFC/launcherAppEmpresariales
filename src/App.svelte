<script>
    import Login from "./lib/Login.svelte";
    import Register from "./lib/Register.svelte"; // Import Register component
    import { isLoggedIn } from "./lib/stores/authStore";
    import VentasScreen from "./lib/modules/Sales.svelte"; // Import VentasScreen
    import ComprasScreen from "./lib/modules/Buys.svelte"; // Import VentasScreen
    import InventarioScreen from "./lib/modules/Stocktaking.svelte"; // Import VentasScreen
    import FacturacionScreen from "./lib/modules/Billing.svelte"; // Import VentasScreen
    import FabricacionScreen from "./lib/modules/Manufacturing.svelte"; // Import VentasScreen
    import Sidebar from "./lib/components/SideBar.svelte";
    import Header from "./lib/components/Header.svelte";
    import ModuleGridSection from "./lib/components/ModuleGridSection.svelte";
    import BackgroundBlur from "./lib/components/BackgroundBlur.svelte";

    let moduloActivo = "dashboard"; // Estado para controlar el módulo activo, 'dashboard' por defecto

    function cambiarModulo(modulo) {
        moduloActivo = modulo;
    }
    let showRegisterForm = false; // Initially show login form

    function handleSwitchToRegister() {
        showRegisterForm = true;
    }

    function handleSwitchToLogin() {
        showRegisterForm = false;
    }
</script>

{#if $isLoggedIn}
    <BackgroundBlur />
    <Sidebar
        on:moduloSeleccionado={(event) => cambiarModulo(event.detail)}
        {moduloActivo}
    />
    <main class="main-content">
        <Header />
        {#if moduloActivo === "dashboard"}
            <ModuleGridSection />
        {:else if moduloActivo === "ventas"}
            <VentasScreen />
        {:else if moduloActivo === "compras"}
            <ComprasScreen />
        {:else if moduloActivo === "inventario"}
            <InventarioScreen />
        {:else if moduloActivo === "facturacion"}
            <FacturacionScreen />
        {:else if moduloActivo === "fabricacion"}
            <FabricacionScreen />
        {/if}
    </main>
{:else if showRegisterForm}
    <Register on:switchToLogin={handleSwitchToLogin} />
{:else}
    <Login on:switchToRegister={handleSwitchToRegister} />
{/if}

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<style>
    .main-content {
        flex: 1;
        width: calc(100% - 220px);
        padding: 30px;
        box-sizing: border-box;
        margin-left: 220px;
        overflow-y: auto;
        height: 100vh;
        transition: color 0.5s ease;
        margin-left: 220px;
    }
</style>
