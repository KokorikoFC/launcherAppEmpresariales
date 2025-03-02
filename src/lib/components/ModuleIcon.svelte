<script>
    export let moduleName;
    export let moduleDescription;
    export let iconClass;
</script>

<div class="module-icon">
    <i class={iconClass} />
    <div class="module-info">
        <span>{moduleName}</span>
        <span class="module-description">{moduleDescription}</span>
    </div>
</div>

<style>
    /* Module Grid Section - Module Icon */
    .module-icon {
        background-color: var(--module-icon-bg-color);
        backdrop-filter: blur(8px);
        border-radius: 15px;
        padding: 15px 20px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        border: none;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
        cursor: pointer;
        height: 70px;
    }

    .module-icon:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    }

    .module-icon i {
        font-size: 2.2em;
        margin-right: 15px;
        color: var(--module-icon-main-color);
        margin-bottom: 0;
    }

    .module-info {
        display: flex;
        flex-direction: column;
    }

    .module-icon span {
        color: var(--module-info-main-text-color);
        font-weight: 500;
        font-size: 1em;
        display: block;
        text-align: left;
    }

    .module-description {
        color: var(--module-info-description-color);
        font-size: 0.85em;
        display: block;
        text-align: left;
    }
</style>
