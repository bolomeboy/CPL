<script>
    import LinearProgress from '@smui/linear-progress';

    import {
        getNflState,
        getLeagueRosters,
        getLeagueTeamManagers,
        waitForAll,
        loadPlayers,
        getLeagueData
    } from '$lib/utils/helper';

    import {
        cplLeagueID,
        segundaLeagueID
    } from '$lib/utils/leagueInfo';

    import PowerRankingsDisplay from '$lib/PowerRankings/PowerRankingsDisplay.svelte';

    import { page } from '$app/stores';

    /*
     * Determine which division is being viewed.
     *
     * /power-rankings?division=red
     * /power-rankings?division=green
     */

    $: division =
        $page.url.searchParams.get('division') === 'green'
            ? 'green'
            : 'red';


    /*
     * Select the correct Sleeper league.
     */

    $: selectedLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * Load the correct league data.
     */

    $: helperPromises = waitForAll(
        getNflState(),
        getLeagueRosters(selectedLeagueID),
        getLeagueTeamManagers(selectedLeagueID),
        getLeagueData(selectedLeagueID),
        loadPlayers(null)
    );

</script>


<style>

    .page {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px 15px 60px;
        box-sizing: border-box;
    }


    h1 {
        text-align: center;
        margin: 20px 0 10px;
    }


    .division {
        text-align: center;
        font-size: 1.2em;
        margin-bottom: 25px;
    }


    .buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 20px 0 30px;
    }


    .buttons a {
        display: block;
        padding: 10px 20px;
        border: 1px solid var(--ccc);
        border-radius: 20px;
        text-decoration: none;
        color: inherit;
        background-color: var(--fff);
    }


    .buttons a:hover {
        background-color: var(--eee);
    }


    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }

</style>


<div class="page">

    <h1>
        Power Rankings
    </h1>


    <div class="division">

        {#if division === 'green'}

            🟢 CPL Green

        {:else}

            🔴 CPL Red

        {/if}

    </div>


    <!-- Division selector -->

    <div class="buttons">

        <a href="/power-rankings?division=red">
            🔴 CPL Red
        </a>

        <a href="/power-rankings?division=green">
            🟢 CPL Green
        </a>

    </div>


    {#await helperPromises}

        <div class="loading">

            <p>
                Calculating
                {division === 'green'
                    ? 'CPL Green'
                    : 'CPL Red'}
                power rankings...
            </p>

            <LinearProgress indeterminate />

        </div>


    {:then [nflState, rostersData, leagueTeamManagers, leagueData, playersInfo]}

        {#if leagueData.status != 'pre_draft' && leagueData.status != 'complete'}

            <PowerRankingsDisplay
                {nflState}
                {rostersData}
                {leagueTeamManagers}
                {leagueData}
                {playersInfo}
            />

        {:else}

            <p style="text-align:center;">

                Power rankings will appear once the league is active.

            </p>

        {/if}


    {:catch error}

        <p style="text-align:center;">

            Something went wrong:
            {error.message}

        </p>

    {/await}

</div>
