<script>
    import { Icon } from '@smui/tab';
    import Matchup from './Matchup.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';


    /*
     * ============================================================
     * PROPS
     * ============================================================
     */

    export let queryWeek;
    export let players;
    export let matchupWeeks;
    export let year;
    export let week;
    export let regularSeasonLength;
    export let selection;
    export let leagueTeamManagers;


    /*
     * ============================================================
     * CURRENT DIVISION
     * ============================================================
     *
     * Read the division directly from the URL.
     *
     * This is important because the Green league must stay Green
     * when the user changes matchup weeks.
     */

    $: division =
        $page.url.searchParams.get('division') === 'green'
            ? 'green'
            : 'red';


    /*
     * ============================================================
     * CURRENT WEEK
     * ============================================================
     */

    let displayWeek =
        queryWeek * 1 || 1;


    /*
     * ============================================================
     * INITIAL LOAD
     * ============================================================
     */

    onMount(() => {

        /*
         * If there is no week in the URL, use the current
         * Sleeper week.
         */

        if (!queryWeek || queryWeek < 1) {

            queryWeek =
                week;

            displayWeek =
                queryWeek * 1;


            /*
             * Keep the current division in the URL.
             */

            goto(
                `/matchups?division=${division}&week=${queryWeek}`,
                {
                    noscroll: true
                }
            );


            /*
             * If the current week is already past the
             * regular season, switch to playoffs.
             */

            if (
                queryWeek >
                regularSeasonLength
            ) {

                selection =
                    'champions';

                return;

            }


            processDisplayMatchup(
                queryWeek
            );

            return;

        }


        /*
         * If the requested week is after the regular season,
         * switch to playoffs.
         */

        if (
            queryWeek >
            regularSeasonLength
        ) {

            selection =
                'champions';

            return;

        }


        /*
         * Display the requested week.
         */

        processDisplayMatchup(
            displayWeek
        );

    });


    /*
     * ============================================================
     * MATCHUP ARRAY
     * ============================================================
     */

    let matchupArray = [];


    /*
     * rand is used as a hacky way to make sure the each block
     * re-renders when matchupArray changes.
     *
     * The new arrays can be too similar for Svelte to notice
     * the difference.
     */

    let rand;


    /*
     * ============================================================
     * PROCESS MATCHUPS
     * ============================================================
     */

    const processDisplayMatchup = (newWeek) => {

        /*
         * Make sure the requested week actually exists.
         */

        const matchup =
            matchupWeeks?.[newWeek - 1];


        if (!matchup) {

            matchupArray =
                [];

            return;

        }


        const allMatchups =
            matchup.matchups;


        matchupArray =
            [];


        for (const key in allMatchups) {

            matchupArray.push(
                allMatchups[key]
            );

        }


        rand =
            Math.random();

    };


    /*
     * ============================================================
     * ACTIVE MATCHUP
     * ============================================================
     */

    let active;


    /*
     * ============================================================
     * CHANGE WEEK
     * ============================================================
     */

    const changeWeek = (newWeek) => {

        displayWeek =
            newWeek;


        processDisplayMatchup(
            displayWeek
        );


        active =
            null;


        /*
         * IMPORTANT:
         *
         * Keep the current division in the URL.
         *
         * Without this, Green becomes Red whenever the
         * user clicks the week arrows.
         */

        goto(
            `/matchups?division=${division}&week=${displayWeek}`,
            {
                noscroll: true
            }
        );

    };

</script>


<style>

    .matchups {
        margin: 2em 0 6em;
    }


    .weekContainer {
        display: flex;
        width: 95%;
        max-width: 600px;
        margin: 0 auto;
        align-items: center;
    }


    :global(.changeWeek) {
        font-size: 3em;
        cursor: pointer;
        color: #888;
    }


    :global(.changeWeek:hover) {
        color: #00316b;
    }


    .spacer {
        width: 48px;
    }


    .weekText {
        flex-grow: 1;
        text-align: center;
        font-size: 2em;
    }


    @media (max-width: 800px) {

        .weekText {
            font-size: 1.6em;
        }

    }


    @media (max-width: 400px) {

        .weekText {
            font-size: 1.3em;
        }

    }


    @media (max-width: 350px) {

        .weekText {
            font-size: 1.2em;
        }

    }

</style>


<div class="matchups">

    <div class="weekContainer">

        {#if displayWeek > 1}

            <Icon
                class="material-icons changeWeek"
                onclick={() =>
                    changeWeek(
                        displayWeek - 1
                    )}
            >
                chevron_left
            </Icon>

        {:else}

            <span class="spacer" />

        {/if}


        <h3 class="weekText">

            {year}
            Week
            {displayWeek}
            Matchups

        </h3>


        {#if displayWeek < matchupWeeks.length}

            <Icon
                class="material-icons changeWeek"
                onclick={() =>
                    changeWeek(
                        displayWeek + 1
                    )}
            >
                chevron_right
            </Icon>

        {:else}

            <span class="spacer" />

        {/if}

    </div>


    {#each matchupArray as matchup, ix (rand * (ix + 1))}

        <Matchup
            {ix}
            {matchup}
            {players}
            {displayWeek}
            bind:active={active}
            {leagueTeamManagers}
        />

    {/each}

</div>
