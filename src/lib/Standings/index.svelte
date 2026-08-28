<script>
    import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import LinearProgress from '@smui/linear-progress';
    import Standing from './Standing.svelte';

    export let standingsData;
    export let leagueTeamManagersData;
    export let division = 'red';


    /*
     * ============================================================
     * STANDINGS SORT ORDER
     * ============================================================
     *
     * Least important to most important.
     *
     * Divisional records are no longer displayed or used
     * as visible standings columns.
     */

    const sortOrder = [
        "fptsAgainst",
        "fpts",
        "ties",
        "wins"
    ];


    /*
     * ============================================================
     * TABLE COLUMNS
     * ============================================================
     *
     * Div W / Div T / Div L have been removed.
     */

    const columnOrder = [
        { name: "W", field: "wins" },
        { name: "T", field: "ties" },
        { name: "L", field: "losses" },
        { name: "FPTS", field: "fpts" },
        { name: "FPTS Against", field: "fptsAgainst" },
        { name: "Streak", field: "streak" }
    ];


    /*
     * ============================================================
     * STATE
     * ============================================================
     */

    let loading = true;
    let preseason = false;

    let standings = [];
    let year = null;
    let leagueTeamManagers = null;


    /*
     * Keep track of the specific data request being displayed.
     *
     * This prevents an older Red request from overwriting
     * a newer Green request.
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


    /*
     * ============================================================
     * LOAD STANDINGS
     * ============================================================
     */

    async function loadStandings(
        standingsPromise,
        teamManagersPromise,
        currentLoad
    ) {

        loading = true;
        preseason = false;


        try {

            /*
             * Load standings and team/manager information.
             */

            const asyncStandingsData =
                await standingsPromise;

            const newLeagueTeamManagers =
                await teamManagersPromise;


            /*
             * If the user switched divisions while the
             * request was loading, ignore the old result.
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


            year =
                yearData;


            /*
             * Make sure standingsInfo contains teams.
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
             * Convert standings object into an array.
             */

            let finalStandings =
                Object.keys(standingsInfo)
                    .map(
                        key =>
                            standingsInfo[key]
                    );


            /*
             * Apply league tiebreakers.
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