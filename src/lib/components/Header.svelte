<script>
    import { auth } from "../../firebaseConfig"; // Import auth
    import { signOut } from "firebase/auth"; // Import signOut
    import { isLoggedIn } from "../stores/authStore"; // Import isLoggedIn store

    let dropdownVisible = false;

    function toggleDropdown() {
        dropdownVisible = !dropdownVisible;
    }

    async function handleLogout() {
        try {
            await signOut(auth);
            console.log("Usuario cerró sesión correctamente.");
            isLoggedIn.set(false); // Update isLoggedIn store to false
            dropdownVisible = false; // Close the dropdown menu after logout
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
            // Handle logout error if needed (e.g., display error message)
        }
    }
</script>

<header class="header-section">
    <div class="search-filter">
        <h1>Dashboard</h1>
    </div>
    <div class="header-icons">
        <button class="settings-icon-btn">
            <i class="fas fa-cog"></i>
        </button>
        <button class="dark-mode-icon-btn">
            <i class="fas fa-moon"></i>
        </button>
        <div class="user-profile">
            <button class="user-icon-btn" on:click={toggleDropdown}>
                <i class="fas fa-user-circle"></i>
            </button>
            <ul
                id="dropdownMenu"
                class="dropdown-menu"
                class:show={dropdownVisible}
            >
                <li><a>Mi Perfil</a></li>
                <li><a>Configuración</a></li>
                <li><a on:click={handleLogout}>Cerrar Sesión</a></li>
            </ul>
        </div>
    </div>
</header>

<style>
    h1 {
        margin: 0;
    }

    /* Main Content Styles - Header Section */
    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px dashed var(--header-border-color);
    }

    .header-section .search-filter {
        display: flex;
        align-items: center;
        flex-grow: 1;
    }

    .filter-button {
        display: none;
        margin-left: 15px;
    }

    .filter-button button {
        display: none;
    }

    /* User Icons Container */
    .header-icons {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    /* User Icon and Dropdown */
    .user-profile {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        z-index: 100;
    }

    .user-icon-btn,
    .settings-icon-btn,
    .dark-mode-icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        border-radius: 50%;
        overflow: hidden;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--user-icon-bg-color);
        backdrop-filter: blur(10px);
        transition: background-color 0.3s ease;
    }

    .user-icon-btn:hover,
    .settings-icon-btn:hover,
    .dark-mode-icon-btn:hover {
        background-color: rgba(255, 255, 255, 0.9);
    }

    .user-icon-btn i,
    .settings-icon-btn i,
    .dark-mode-icon-btn i {
        font-size: 1.2em;
        color: var(--user-icon-color);
    }

    .dark-mode .dark-mode-icon-btn i {
        color: #bbdefb;
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        /* Dropdown sale hacia abajo */
        bottom: auto;
        /* Eliminar bottom auto */
        right: 0;
        background-color: var(--dropdown-menu-bg-color);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 10px 0;
        margin-top: 5px;
        width: 150px;
        list-style: none;
        padding: 0;
        margin: 0;
        display: none;
        z-index: 101;
        /* Z-index del dropdown superior a modulos */
        transform-origin: top right;
        /* Punto de origen para la animación */
        opacity: 0;
        transform: translateY(-10px) scaleY(0.8);
        /* Animación sutil al aparecer */
        transition:
            opacity 0.2s ease-out,
            transform 0.2s ease-out;
    }

    .dropdown-menu.show {
        display: block;
        opacity: 1;
        transform: translateY(0) scaleY(1);
        /* Mostrar con animación */
    }

    .dropdown-menu li a {
        display: block;
        padding: 10px 15px;
        text-decoration: none;
        color: var(--dropdown-menu-item-text-color);
        font-size: 0.9em;
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
        cursor: pointer;
        user-select: none;
    }

    .dropdown-menu li a:hover {
        background-color: var(--dropdown-menu-item-hover-bg-color);
        color: var(--dropdown-menu-item-hover-text-color);
    }
</style>
