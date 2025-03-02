<script>
    export let empleado; // Propiedad para recibir los datos del empleado
</script>

<div class="employee-card">
    <img src={empleado.fotoUrl} alt={empleado.nombre} class="employee-photo" />
    <div class="employee-info">
        <h3>{empleado.nombre}</h3>
        <span class="employee-position">{empleado.puesto}</span>
        <span class="employee-contact">{empleado.email}</span>
        <span class="employee-contact">{empleado.telefono}</span>
    </div>
</div>

<style>
    .employee-card {
        background-color: var(--sidebar-bg-color);
        backdrop-filter: blur(8px);
        border-radius: 15px;
        padding: 0;
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: row;
        align-items: stretch;
        text-align: left;
        gap: 15px;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        overflow: hidden;
        width: 100%;
        height: 180px; /*  <--  Añadida altura fija a las tarjetas  */
    }

    .employee-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    }

    .employee-photo {
        width: 120px;
        height: 100%;
        object-fit: cover;
        box-shadow: none;
        margin-bottom: 0;
        border-radius: 15px 0 0 15px;
    }

    .employee-info {
        padding: 15px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .employee-info h3 {
        color: var(--card-heading-color);
        font-size: 1.2em;
        margin: 0 0 3px 0;
        font-weight: 600;
    }

    .employee-info span.employee-position {
        display: block;
        font-size: 1em;
        color: var(--main-content-text-color);
        margin-bottom: 6px;
    }

    .employee-info span.employee-contact {
        display: block;
        font-size: 0.9em;
        color: var(--module-icon-main-color);
        margin-bottom: 2px;
    }

    .employee-info span.employee-contact:last-child {
        margin-bottom: 0;
    }
</style>
