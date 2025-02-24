<script>
    export let salesData = []; // Expect salesData as a prop
    export let headers = [];     // Expect headers as a prop (array of strings)
    export let rowKeys = [];   // New prop: array of keys for data access
    export let viewAllLink = ""; // New prop: link to view all sales
</script>

<table class="sales-table">
    <thead>
        <tr>
            {#each headers as headerText}
                <th>{headerText}</th>
            {/each}
        </tr>
    </thead>
    <tbody id="sales-table-body">
        {#each salesData as sale}
            <tr>
                {#each rowKeys as key}  <td>{sale[key]}</td>      {/each}
            </tr>
        {/each}
    </tbody>
</table>

<div class="sales-data-table-container">
    <p class="view-all-link">{viewAllLink}</p>
</div>

<style>
    :root {
        --body-bg-color: #e0f7fa;
        --view-all-link-color: #3f51b5;
    }

    .sales-data-table-container {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .sales-data-table-container h3 {
        color: var(--card-heading-color);
        font-size: 1.3em;
        margin-top: 0;
        margin-bottom: 25px;
        font-weight: 600;
    }

    .sales-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95em;
    }

    .sales-table th,
    .sales-table td {
        padding: 14px 18px;
        text-align: left;
        border-bottom: 1px dashed var(--table-row-border-color);
    }

    .sales-table th {
        font-weight: 500;
        color: var(--table-header-text-color);
        font-size: 0.9em;
    }

    .sales-table tbody tr:last-child td {
        border-bottom: none;
    }

    .view-all-link {
        color: blue; /* Example color */
        text-decoration: none;
        align-self: flex-end; /* Try to align right */
    }
</style>