<script>
    import ManagerRow from './ManagerRow.svelte';

    export let managers;
    export let redLeagueTeamManagers;
    export let greenLeagueTeamManagers;

    const getLeagueData = (manager) => {
        return manager.division === 'green'
            ? greenLeagueTeamManagers
            : redLeagueTeamManagers;
    };
</script>

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
            font-size: 2em;
            margin: 1.5em 0 1em;
        }

        .divisionHeader {
            font-size: 1.4em;
        }
    }
</style>

<div class="managerContainer">

    <h2>California Primeira Liga Managers</h2>

    <!-- RED -->
    <div class="divisionHeader">
        🔴 CPL Red
    </div>

    <div class="managerConstrained">

        {#each managers.filter(m => m.division === 'red') as manager}

            <ManagerRow
                {manager}
                leagueTeamManagers={getLeagueData(manager)}
            />

        {/each}

    </div>


    <!-- GREEN -->
    <div class="divisionHeader">
        🟢 CPL Green
    </div>

    <div class="managerConstrained">

        {#each managers.filter(m => m.division === 'green') as manager}

            <ManagerRow
                {manager}
                leagueTeamManagers={getLeagueData(manager)}
            />

        {/each}

    </div>

</div>