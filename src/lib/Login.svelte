<script>
    import { auth, db } from "../firebaseConfig"; // Import db from firebaseConfig
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { collection, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
    import BackgroundBlur from "./components/BackgroundBlur.svelte";
    import { isLoggedIn } from "../lib/stores/authStore";

    let email = "";
    let password = "";
    let errorMessage = "";

    async function handleSubmit() {
        errorMessage = "";
        try {
            // 1. Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;
            console.log("Usuario লগইন en Auth:", user.uid);

            // 2. Fetch user data from Firestore 'users' collection
            const usersCollection = collection(db, "users");
            const userDocRef = doc(usersCollection, user.uid);

            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("Datos de usuario de Firestore:", userData);

                // For now, just check if the user exists in Firestore.
                // You can add role-based checks here later if needed (e.g., if (userData.role === 'administrator') ...)

                // 3. If user exists in Firestore, consider login successful and update store
                isLoggedIn.set(true);
                console.log("Inicio de sesión exitoso (Firestore verificado)!");
            } else {
                // User exists in Firebase Auth but not in Firestore 'users' collection (unlikely scenario if registration is correct)
                errorMessage =
                    "Usuario no encontrado en la base de datos de roles.";
                console.error(
                    "Usuario no encontrado en Firestore 'users' collection",
                );
                // Optionally, sign out from Firebase Auth as well if user is not in Firestore
                // await signOut(auth);
            }
        } catch (error) {
            // Login error (Auth or Firestore)
            console.error("Error al iniciar sesión:", error.message);
            errorMessage = error.message;
        }
    }
    import { createEventDispatcher } from "svelte"; // Import event dispatcher
    const dispatch = createEventDispatcher(); // Create event dispatcher

    function switchToRegister() {
        dispatch("switchToRegister"); // Dispatch event to parent (App.svelte)
    }
</script>

<section class="login-module-section-original">
    <BackgroundBlur />
    <div class="login-card-original">
        <header class="login-header-original">
            <h2>Iniciar Sesión</h2>
        </header>

        <div class="login-form-container-original">
            <form
                class="login-form-original"
                on:submit|preventDefault={handleSubmit}
            >
                <div class="form-group-original">
                    <label for="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        bind:value={email}
                        class="input-original"
                        required
                    />
                </div>

                <div class="form-group-original">
                    <label for="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        bind:value={password}
                        class="input-original"
                        required
                    />
                </div>

                {#if errorMessage}
                    <div class="error-message-original">{errorMessage}</div>
                {/if}

                <button type="submit" class="button-primary-original"
                    >Iniciar Sesión</button
                >
            </form>
        </div>

        <div class="switch-form-links-original">
            <button
                type="button"
                class="switch-button-original"
                on:click={switchToRegister}
            >
                ¿No tienes cuenta? Regístrate
            </button>
        </div>
    </div>
</section>

<style>
    /* Styles are the same as the refined Login.svelte from previous steps */
    .login-module-section-original {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background-color: transparent;
        backdrop-filter: none;
    }

    .login-card-original {
        background-color: rgba(var(--card-bg-color-rgb), 0.95);
        backdrop-filter: blur(15px);
        border-radius: 20px;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
        max-width: 480px;
        width: 90%;
        padding: 45px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .login-header-original {
        color: var(--card-heading-color);
        border-bottom: 2px dashed var(--header-border-color);
        padding-bottom: 18px;
        margin-bottom: 30px;
        text-align: center;
    }

    .login-header-original h2 {
        margin: 0;
        font-size: 2.4em;
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    .login-form-container-original {
        padding: 0;
    }

    .login-form-original {
        display: flex;
        flex-direction: column;
        gap: 22px;
    }

    .form-group-original {
        display: flex;
        flex-direction: column;
    }

    .form-group-original label {
        color: var(--card-text-color);
        font-weight: 600;
        margin-bottom: 7px;
        font-size: 1.05em;
        opacity: 0.9;
    }

    .input-original {
        padding: 13px 16px;
        border: 1.5px solid var(--input-border-color);
        border-radius: 10px;
        background-color: var(--input-bg-color);
        color: var(--input-text-color);
        font-size: 1em;
        transition: border-color 0.2s ease-in-out;
    }

    .input-original:focus {
        border-color: var(--primary-color);
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-color-transparent);
    }

    .button-primary-original {
        padding: 13px 28px;
        border: none;
        border-radius: 12px;
        background-color: var(--primary-color);
        color: var(--button-text-color);
        font-size: 1.1em;
        font-weight: 700;
        cursor: pointer;
        transition:
            background-color 0.3s ease-in-out,
            transform 0.2s ease-in-out;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.18);
    }

    .button-primary-original:hover {
        background-color: var(--primary-color-darker);
        transform: translateY(-2px);
        box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
    }

    .error-message-original {
        color: var(--error-color);
        background-color: var(--error-bg-color);
        padding: 11px 14px;
        border-radius: 8px;
        margin-bottom: 18px;
        font-size: 0.95em;
        text-align: center;
    }

    :root {
        /* Color variables (same as before) */
        --card-bg-color: #f9f9f9;
        --card-bg-color-rgb: 249, 249, 249;
        --card-heading-color: #333;
        --header-border-color: #ddd;
        --card-text-color: #555;
        --input-border-color: #ccc;
        --input-bg-color: #fff;
        --input-text-color: #333;
        --primary-color: #007bff;
        --primary-color-darker: #0056b3;
        --primary-color-transparent: rgba(0, 123, 255, 0.2);
        --button-text-color: #fff;
        --error-color: #dc3545;
        --error-bg-color: #f8d7da;
    }

    .switch-form-links-original {
        margin-top: 20px;
        text-align: center;
    }

    .switch-button-original {
        background: none;
        border: none;
        color: var(--primary-color);
        cursor: pointer;
        font-size: 1em;
        transition: color 0.2s ease-in-out;
        text-decoration: underline; /* Add underline for link appearance */
        padding: 5px 10px; /* Add some padding for better click area */
        border-radius: 5px; /* Optional: Add slight border radius */
    }

    .switch-button-original:hover {
        color: var(--primary-color-darker);
    }
</style>
