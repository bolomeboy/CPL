<script>
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

    import PowerRankingsDisplay from './PowerRankingsDisplay.svelte';
    import LinearProgress from '@smui/linear-progress';

    /*
     * Determine which division is being viewed.
     *
     * /power-rankings?division=red
     * /power-rankings?division=green
     */

    export let division = 'red';

    /*
     * Select the correct Sleeper league.
     */

    const selectedLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * Load data from the selected league.
     */

    const helperPromises = waitForAll(
        getNflState(),
        getLeagueRosters(selectedLeagueID),
        getLeagueTeamManagers(selectedLeagueID),
        getLeagueData(selectedLeagueID),
        loadPlayers(null)
    );

</script>

<style>
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>


{#await helperPromises}

    <div class="loading">

        <p>
            Calculating
            {division === 'green' ? 'CPL Green' : 'CPL Red'}
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

    {/if}


{:catch error}

    <p>
        Something went wrong: {error.message}
    </p>

{/await}