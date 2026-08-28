<script>
    import LinearProgress from '@smui/linear-progress';

    import {
        getBrackets,
        getLeagueMatchups,
        getLeagueTeamManagers,
        loadPlayers,
        waitForAll
    } from '$lib/utils/helper';

    import {
        cplLeagueID,
        segundaLeagueID
    } from '$lib/utils/leagueInfo';

    import { MatchupsAndBrackets } from '$lib/components';

    import { page } from '$app/stores';


    /*
     * ============================================================
     * DETERMINE DIVISION FROM URL
     * ============================================================
     */

    $: division =
        $page.url.searchParams.get('division') === 'green'
            ? 'green'
            : 'red';


    /*
     * ============================================================
     * SELECT THE CORRECT LEAGUE
     * ============================================================
     */

    $: selectedLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * ============================================================
     * CURRENT WEEK
     * ============================================================
     *
     * Keeps the existing week selector working.
     */

    $: queryWeek =
        $page.url.searchParams.get('week');


    /*
     * ============================================================
     * LOAD THE CORRECT LEAGUE DATA
     * ============================================================
     *
     * This follows the same reactive approach as
     * the working Power Rankings page.
     */

    $: helperPromises = waitForAll(
        getLeagueMatchups(selectedLeagueID),
        getBrackets(selectedLeagueID),
        loadPlayers(null),
        getLeagueTeamManagers(selectedLeagueID)
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


    /*
     * ============================================================
     * PAGE TITLE
     * ============================================================
     */

    h1 {
        text-align: center;
        margin: 20px 0 10px;
        font-size: 1.8em;
    }


    /*
     * ============================================================
     * RED / GREEN BUTTONS
     * ============================================================
     */

    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
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

        font-size: 0.95em;

        font-weight: 600;

        cursor: pointer;

        transition:
            background-color 0.15s ease,
            transform 0.15s ease;
    }


    .buttons a:hover {
        background-color: var(--eee);

        transform: translateY(-1px);
    }


    /*
     * Highlight the current division.
     */

    .buttons a.active {
        background-color: var(--blueOne);

        color: #fff;

        border-color: var(--blueOne);
    }


    /*
     * ============================================================
     * LOADING
     * ============================================================
     */

    .loading {
        display: block;

        width: 85%;

        max-width: 500px;

        margin: 80px auto;

        text-align: center;
    }


    /*
     * ============================================================
     * MOBILE
     * ============================================================
     */

    @media (max-width: 500px) {

        h1 {
            font-size: 1.5em;
        }


        .buttons {
            margin-bottom: 25px;
        }


        .buttons a {
            padding: 8px 14px;

            font-size: 0.85em;
        }

    }

</style>


<div class="page">


    <!--
        ========================================================
        TITLE
        ========================================================
    -->

    <h1>

        {division === 'green'
            ? 'CPL Green Matchups'
            : 'CPL Red Matchups'}

    </h1>


    <!--
        ========================================================
        RED / GREEN SWITCHER
        ========================================================
    -->

    <div class="buttons">

        <a
            href="/matchups?division=red"
            class:active={division === 'red'}
        >

            🔴 CPL Red

        </a>


        <a
            href="/matchups?division=green"
            class:active={division === 'green'}
        >

            🟢 CPL Green

        </a>

    </div>


    <!--
        ========================================================
        MATCHUPS
        ========================================================
    -->

    {#await helperPromises}

        <div class="loading">

            <p>

                Loading
                {division === 'green'
                    ? 'CPL Green'
                    : 'CPL Red'}
                matchups...

            </p>

            <LinearProgress indeterminate />

        </div>


    {:then [
        matchupsData,
        bracketsData,
        playersData,
        leagueTeamManagersData
    ]}

        <MatchupsAndBrackets
            {queryWeek}
            {matchupsData}
            {bracketsData}
            {playersData}
            {leagueTeamManagersData}
        />


    {:catch error}

        <div class="loading">

            <p>

                Something went wrong:
                {error.message}

            </p>

        </div>

    {/await}

</div>