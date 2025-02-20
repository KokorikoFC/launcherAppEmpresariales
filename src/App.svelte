<script>
    import Login from "./lib/Login.svelte";
    import Register from "./lib/Register.svelte"; // Import Register component
    import { isLoggedIn } from "./lib/stores/authStore";

    let showRegisterForm = false; // Initially show login form

    function handleSwitchToRegister() {
        showRegisterForm = true;
    }

    function handleSwitchToLogin() {
        showRegisterForm = false;
    }
</script>

<main>
    {#if $isLoggedIn}
        <h1>Hola buenas tardes</h1>
    {:else if showRegisterForm}
        <Register on:switchToLogin={handleSwitchToLogin} />
    {:else}
        <Login on:switchToRegister={handleSwitchToRegister} />
    {/if}
</main>

<style>
    main {
        font-family: sans-serif;
        padding: 20px;
    }
</style>
