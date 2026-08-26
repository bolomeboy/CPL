<script>
    import ManagerRow from './ManagerRow.svelte';

    export let managers;

    let innerWidth;
</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    .managerContainer {
        width: 100%;
        margin: 2em 0 5em;
    }

    .managerConstrained {
        width: 97%;
        max-width: 800px;
        margin: 0 auto;
    }

    h2 {
        text-align: center;
        font-size: 2.8em;
        margin: 2em 0 1.5em;
        line-height: 1em;
    }

    .divisionHeader {
        text-align: center;
        font-size: 1.8em;
        margin: 2em 0 1em;
    }

    @media (max-width: 520px) {
        h2 {
            text-align: center;
            font-size: 2em;
            margin: 1.5em 0 1em;
            line-height: 1em;
        }

        .divisionHeader {
            font-size: 1.4em;
        }
    }
</style>

<div class="managerContainer">

    <h2>California Primeira Liga Managers</h2>

    <!-- RED MANAGERS -->
    <div class="divisionHeader">
        🔴 CPL Red
    </div>

    <div class="managerConstrained">

        {#each managers.filter(manager => manager.division === 'red') as manager, key}

            <ManagerRow
                {manager}
                {key}
            />

        {/each}

    </div>


    <!-- GREEN MANAGERS -->
    <div class="divisionHeader">
        🟢 CPL Green
    </div>

    <div class="managerConstrained">

        {#each managers.filter(manager => manager.division === 'green') as manager, key}

            <ManagerRow
                {manager}
                {key}
            />

        {/each}

    </div>

</div>
