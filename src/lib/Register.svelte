<script>
    import { auth, db } from "../firebaseConfig"; // Import auth and db
    import { createUserWithEmailAndPassword } from "firebase/auth";
    import { collection, doc, setDoc } from "firebase/firestore"; // Firestore functions
    import BackgroundBlur from "./components/BackgroundBlur.svelte";

    let email = "";
    let password = "";
    let errorMessage = "";
    let successMessage = "";
    let selectedRole = "usuario"; // Default role

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function switchToLogin() {
        console.log(
            "Register.svelte: switchToLogin() called - Dispatching 'switchToLogin' event",
        );
        dispatch("switchToLogin");
    }

    async function handleSubmit() {
        errorMessage = "";
        successMessage = "";
        try {
            // 1. Create user with email and password in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;
            console.log("Usuario registrado en Auth:", user.uid);

            // 2. Store user data in Firestore 'users' collection
            const usersCollection = collection(db, "users"); // Get 'users' collection
            const userDocRef = doc(usersCollection, user.uid); // Document reference for user

            await setDoc(userDocRef, {
                // Set data for the user document
                email: email,
                role: selectedRole, // Use selected role
            });

            console.log("Datos de usuario guardados en Firestore");
            successMessage = "Registro exitoso! Ya puedes iniciar sesión.";
            setTimeout(() => {
                console.log(
                    "Register.svelte: setTimeout callback - Calling switchToLogin()",
                ); // ADDED LOG
                switchToLogin();
            }, 2000);
        } catch (error) {
            // Registration error
            console.error("Error al registrar usuario:", error.message);
            errorMessage = error.message;
        }
    }
</script>

<section class="login-module-section-original">
    <BackgroundBlur />
    <div class="login-card-original">
        <header class="login-header-original">
            <h2>Registro de Usuario</h2>
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

                <div class="form-group-original">
                    <label for="role">Rol</label>
                    <select class="input-original" id="role" bind:value={selectedRole}>
                        <option value="usuario">Usuario</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>

                {#if errorMessage}
                    <div class="error-message-original">{errorMessage}</div>
                {/if}
                {#if successMessage}
                    <div class="success-message-original">{successMessage}</div>
                {/if}

                <button type="submit" class="button-primary-original"
                    >Registrarse</button
                >
            </form>
        </div>
        <div class="switch-form-links-original">
            <button
                type="button"
                class="switch-button-original"
                on:click={switchToLogin}
            >
                ¿Ya tienes cuenta? Inicia Sesión
            </button>
        </div>
    </div>
</section>

<style>
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

    .success-message-original {
        color: var(
            --success-color
        );
        background-color: var(
            --success-bg-color
        ); 
        padding: 11px 14px;
        border-radius: 8px;
        margin-bottom: 18px;
        font-size: 0.95em;
        text-align: center;
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
        text-decoration: underline;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .switch-button-original:hover {
        color: var(--primary-color-darker);
    }
</style>