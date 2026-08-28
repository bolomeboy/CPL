<script>
    import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import LinearProgress from '@smui/linear-progress';
    import Standing from './Standing.svelte';

    export let standingsData;
    export let leagueTeamManagersData;
    export let division = 'red';


    // Least important to most important.
    // The most important tiebreaker goes last.
    const sortOrder = [
        "fptsAgainst",
        "divisionTies",
        "divisionWins",
        "fpts",
        "ties",
        "wins"
    ];


    // Column order from left to right.
    const columnOrder = [
        { name: "W", field: "wins" },
        { name: "T", field: "ties" },
        { name: "L", field: "losses" },
        { name: "Div W", field: "divisionWins" },
        { name: "Div T", field: "divisionTies" },
        { name: "Div L", field: "divisionLosses" },
        { name: "FPTS", field: "fpts" },
        { name: "FPTS Against", field: "fptsAgainst" },
        { name: "Streak", field: "streak" }
    ];


    let loading = true;
    let preseason = false;
    let standings = [];
    let year = null;
    let leagueTeamManagers = null;


    /*
     * ============================================================
     * LOAD STANDINGS
     * ============================================================
     *
     * This is intentionally reactive.
     *
     * When the URL changes from:
     *
     * /standings?division=red
     *
     * to:
     *
     * /standings?division=green
     *
     * SvelteKit provides new standingsData and this
     * block runs again.
     */

    $: if (standingsData) {

        loadStandings(
            standingsData,
            leagueTeamManagersData
        );

    }


    async function loadStandings(
        standingsPromise,
        teamManagersPromise
    ) {

        loading = true;
        preseason = false;


        const asyncStandingsData =
            await standingsPromise;


        /*
         * No standings yet.
         */

        if (!asyncStandingsData) {

            standings = [];

            year = null;

            leagueTeamManagers =
                await teamManagersPromise;

            loading = false;

            preseason = true;

            return;

        }


        /*
         * Get the new standings information.
         */

        const {
            standingsInfo,
            yearData
        } = asyncStandingsData;


        /*
         * Get the managers/teams from the
         * same Red or Green league.
         */

        leagueTeamManagers =
            await teamManagersPromise;


        year = yearData;


        /*
         * Convert standings object into an array.
         */

        let finalStandings =
            Object.keys(standingsInfo)
                .map(
                    key =>
                        standingsInfo[key]
                );


        /*
         * Apply the league's tiebreaker order.
         */

        for (const sortType of sortOrder) {

            if (
                !finalStandings[0] ||
                (
                    !finalStandings[0][sortType] &&
                    finalStandings[0][sortType] != 0
                )
            ) {
                continue;
            }


            finalStandings =
                [...finalStandings].sort(
                    (a, b) =>
                        b[sortType] -
                        a[sortType]
                );

        }


        /*
         * Replace the displayed standings.
         */

        standings =
            finalStandings;


        loading = false;

    }

</script>


<style>

    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }


    :global(.center) {
        text-align: center;
    }


    :global(.wrappable) {
        white-space: normal;
        line-height: 1.2em;
    }


    .standingsTable {
        max-width: 100%;
        overflow-x: scroll;
        margin: 0.5em 0 5em;
    }

</style>


{#if loading}

    <div class="loading">

        <p>
            Loading
            {division === 'green'
                ? 'CPL Green'
                : 'CPL Red'}
            Standings...
        </p>

        <LinearProgress indeterminate />

    </div>


{:else if preseason}

    <div class="loading">

        <p>
            {division === 'green'
                ? 'CPL Green'
                : 'CPL Red'}
            is in preseason. No standings yet.
        </p>

    </div>


{:else}

    <div class="standingsTable">

        <DataTable
            table$aria-label="League Standings"
        >

            <Head>

                <Row>

                    <Cell class="center">
                        Team
                    </Cell>


                    {#each columnOrder as column}

                        <Cell class="center wrappable">

                            {column.name}

                        </Cell>

                    {/each}

                </Row>

            </Head>


            <Body>

                {#each standings as standing}

                    <Standing
                        {columnOrder}
                        {standing}
                        {leagueTeamManagers}
                        team={
                            getTeamFromTeamManagers(
                                leagueTeamManagers,
                                standing.rosterID
                            )
                        }
                    />

                {/each}

            </Body>

        </DataTable>

    </div>

{/if}
