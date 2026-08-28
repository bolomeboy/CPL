<script>
    import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import LinearProgress from '@smui/linear-progress';
    import Standing from './Standing.svelte';

    export let standingsData;
    export let leagueTeamManagersData;
    export let division = 'red';


    const sortOrder = [
        "fptsAgainst",
        "divisionTies",
        "divisionWins",
        "fpts",
        "ties",
        "wins"
    ];


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
     * Keep track of the specific data request being displayed.
     *
     * This prevents an older Red request from overwriting
     * a newer Green request (or vice versa).
     */

    let loadNumber = 0;


    /*
     * ============================================================
     * RELOAD WHEN DIVISION DATA CHANGES
     * ============================================================
     */

    $: if (standingsData && leagueTeamManagersData) {

        const currentLoad =
            ++loadNumber;

        loadStandings(
            standingsData,
            leagueTeamManagersData,
            currentLoad
        );

    }


    async function loadStandings(
        standingsPromise,
        teamManagersPromise,
        currentLoad
    ) {

        /*
         * Show loading while the new league is being loaded.
         */

        loading = true;
        preseason = false;


        try {

            /*
             * Load both pieces of data.
             */

            const asyncStandingsData =
                await standingsPromise;

            const newLeagueTeamManagers =
                await teamManagersPromise;


            /*
             * If another division was selected while
             * this request was loading, ignore this result.
             */

            if (currentLoad !== loadNumber) {
                return;
            }


            leagueTeamManagers =
                newLeagueTeamManagers;


            /*
             * No standings means the league hasn't
             * started yet.
             */

            if (!asyncStandingsData) {

                standings = [];

                year = null;

                loading = false;

                preseason = true;

                return;

            }


            const {
                standingsInfo,
                yearData
            } = asyncStandingsData;


            year = yearData;


            /*
             * Make sure standingsInfo actually contains
             * teams before trying to sort it.
             */

            if (
                !standingsInfo ||
                Object.keys(standingsInfo).length === 0
            ) {

                standings = [];

                loading = false;

                preseason = true;

                return;

            }


            /*
             * Convert the standings object into an array.
             */

            let finalStandings =
                Object.keys(standingsInfo)
                    .map(
                        key =>
                            standingsInfo[key]
                    );


            /*
             * Apply the normal league tiebreakers.
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
             * Only update the page if this is still
             * the most recent request.
             */

            if (currentLoad !== loadNumber) {
                return;
            }


            standings =
                finalStandings;

            loading = false;

        } catch (error) {

            /*
             * If this is still the current request,
             * stop loading instead of getting stuck.
             */

            if (currentLoad !== loadNumber) {

                return;

            }


            console.error(
                'Error loading standings:',
                error
            );


            standings = [];

            loading = false;

            preseason = true;

        }

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
            standings...
        </p>

        <LinearProgress indeterminate />

    </div>


{:else if preseason}

    <div class="loading">

        <p>
            {division === 'green'
                ? 'CPL Green'
                : 'CPL Red'}
            standings are not available yet.
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
