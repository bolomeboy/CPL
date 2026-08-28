<script>
    import { round } from '$lib/utils/helper';
    import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import LinearProgress from '@smui/linear-progress';
    import { onMount } from 'svelte';
    import Standing from './Standing.svelte';

    export let standingsData;
    export let leagueTeamManagersData;
    export let division = 'red';


    // Least important to most important
    // The most important usually goes last.
    const sortOrder = [
        "fptsAgainst",
        "divisionTies",
        "divisionWins",
        "fpts",
        "ties",
        "wins"
    ];


    // Column order from left to right
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

    let standings;
    let year;
    let leagueTeamManagers;


    onMount(async () => {

        const asyncStandingsData =
            await standingsData;


        if (!asyncStandingsData) {

            loading = false;

            preseason = true;

            return;

        }


        const {
            standingsInfo,
            yearData
        } = asyncStandingsData;


        leagueTeamManagers =
            await leagueTeamManagersData;


        year = yearData;


        let finalStandings =
            Object.keys(standingsInfo)
                .map(
                    key =>
                        standingsInfo[key]
                );


        for (const sortType of sortOrder) {

            if (
                !finalStandings[0][sortType] &&
                finalStandings[0][sortType] != 0
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


        standings =
            finalStandings;


        loading = false;

    });


    let innerWidth;

</script>


<svelte:window bind:innerWidth={innerWidth} />


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


    /*
     * The title is now handled by the
     * standings route page, so the old
     * generic title is removed.
     */

    .standingsTable {
        max-width: 100%;
        overflow-x: scroll;
        margin: 0.5em 0 5em;
    }

</style>


{#if loading}

    <div class="loading">

        <p>
            Loading Standings...
        </p>

        <LinearProgress indeterminate />

    </div>


{:else if preseason}

    <div class="loading">

        <p>
            Preseason, No Standings Yet
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