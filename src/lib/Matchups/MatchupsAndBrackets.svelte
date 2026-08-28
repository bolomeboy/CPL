<script>
	import LinearProgress from '@smui/linear-progress';
	import MatchupWeeks from './MatchupWeeks.svelte';
	import Brackets from './Brackets.svelte';
    import Button, { Group, Label } from '@smui/button';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { loadPlayers } from '$lib/utils/helper';

	export let queryWeek;
	export let leagueTeamManagersData;
	export let matchupsData;
	export let bracketsData;
	export let playersData;

    let players;
    let matchupWeeks;
    let year;
    let week;
    let regularSeasonLength;
    let brackets;
    let leagueTeamManagers;

    let loading = true;

    /*
     * Keep track of which data promises we have loaded.
     *
     * This is important because the Red and Green leagues
     * are different leagues and the component needs to
     * reload when SvelteKit gives it new data.
     */
    let loadedMatchupsData = null;
    let loadedBracketsData = null;
    let loadedLeagueTeamManagersData = null;
    let loadedPlayersData = null;


    /*
     * ============================================================
     * LOAD MATCHUP DATA
     * ============================================================
     */

    const loadMatchupData = async () => {

        loading = true;

        try {

            const newBrackets =
                await bracketsData;

            const matchupsInfo =
                await matchupsData;

            const newLeagueTeamManagers =
                await leagueTeamManagersData;

            const playersInfo =
                await playersData;


            /*
             * Save the newly loaded data.
             */

            brackets =
                newBrackets;

            leagueTeamManagers =
                newLeagueTeamManagers;

            matchupWeeks =
                matchupsInfo?.matchupWeeks || [];

            year =
                matchupsInfo?.year;

            week =
                matchupsInfo?.week;

            regularSeasonLength =
                matchupsInfo?.regularSeasonLength;


            players =
                playersInfo?.players || [];


            /*
             * Remember which promises/data we loaded.
             */

            loadedMatchupsData =
                matchupsData;

            loadedBracketsData =
                bracketsData;

            loadedLeagueTeamManagersData =
                leagueTeamManagersData;

            loadedPlayersData =
                playersData;


            loading = false;


            /*
             * Refresh stale player information.
             */

            if (playersInfo?.stale) {

                const newPlayersInfo =
                    await loadPlayers(null, true);

                players =
                    newPlayersInfo.players;

            }

        } catch (error) {

            console.error(
                'Error loading matchup data:',
                error
            );

            loading = false;

        }

    };


    /*
     * ============================================================
     * INITIAL LOAD
     * ============================================================
     */

    onMount(() => {

        loadMatchupData();

    });


    /*
     * ============================================================
     * WATCH FOR RED / GREEN DATA CHANGES
     * ============================================================
     *
     * When the route changes from:
     *
     * /matchups?division=red
     *
     * to:
     *
     * /matchups?division=green
     *
     * the page can give this component new promises.
     *
     * Reload the component's data when that happens.
     */

    $: if (
        matchupsData &&
        (
            loadedMatchupsData !== matchupsData ||
            loadedBracketsData !== bracketsData ||
            loadedLeagueTeamManagersData !== leagueTeamManagersData ||
            loadedPlayersData !== playersData
        )
    ) {

        loadMatchupData();

    }


    /*
     * ============================================================
     * CHANGE REGULAR SEASON / PLAYOFF SELECTION
     * ============================================================
     */

    const changeSelection = (s) => {

        if (s == 'regular') {

            queryWeek = 1;

            goto(
                `/matchups?division=${division}&week=1`,
                {
                    noscroll: true
                }
            );

        } else if (selection == 'regular') {

            queryWeek = 99;

            goto(
                `/matchups?division=${division}&week=99`,
                {
                    noscroll: true
                }
            );

        }

        selection = s;

    };


    let selection = 'regular';


    /*
     * ============================================================
     * CURRENT DIVISION
     * ============================================================
     *
     * We need this here so the week buttons don't accidentally
     * remove the current division from the URL.
     */

    import { page } from '$app/stores';

    $: division =
        $page.url.searchParams.get('division') === 'green'
            ? 'green'
            : 'red';

</script>


<style>

    .message {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }

    .buttonHolder {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 3em 0;
    }

</style>


{#if loading}

    <div class="message">

        <p>
            Loading
            {division === 'green'
                ? 'CPL Green'
                : 'CPL Red'}
            matchups...
        </p>

        <LinearProgress indeterminate />

    </div>


{:else}

    {#if matchupWeeks.length}

        <div class="buttonHolder">

            <Group variant="outlined">

                <!-- Regular Season -->

                <Button
                    class="selectionButtons"
                    onclick={() => changeSelection('regular')}
                    variant={
                        selection == 'regular'
                            ? "raised"
                            : "outlined"
                    }
                >

                    <Label>
                        Regular Season
                    </Label>

                </Button>


                <!-- Playoffs -->

                <Button
                    class="selectionButtons"
                    onclick={() => changeSelection('champions')}
                    variant={
                        selection == 'champions' ||
                        selection == 'losers'
                            ? "raised"
                            : "outlined"
                    }
                >

                    <Label>
                        Playoffs
                    </Label>

                </Button>

            </Group>


            {#if selection == 'champions' || selection == 'losers'}

                <Group variant="outlined">

                    <!-- Championship Bracket -->

                    <Button
                        class="selectionButtons"
                        onclick={() => changeSelection('champions')}
                        variant={
                            selection == 'champions'
                                ? "raised"
                                : "outlined"
                        }
                    >

                        <Label>
                            Champions' Bracket
                        </Label>

                    </Button>


                    <!-- Losers Bracket -->

                    <Button
                        class="selectionButtons"
                        onclick={() => changeSelection('losers')}
                        variant={
                            selection == 'losers'
                                ? "raised"
                                : "outlined"
                        }
                    >

                        <Label>
                            Losers' Bracket
                        </Label>

                    </Button>

                </Group>

            {/if}

        </div>


        {#if selection == 'regular'}

            <MatchupWeeks
                {players}
                {queryWeek}
                {matchupWeeks}
                {regularSeasonLength}
                {year}
                {week}
                bind:selection={selection}
                {leagueTeamManagers}
            />

        {/if}


    {:else}

        <div class="message">

            <p>
                No upcoming matchups...
            </p>

        </div>

    {/if}


    {#if
        brackets?.champs?.bracket?.[0]?.[0]?.[0]?.points &&
        (selection == 'champions' || selection == 'losers')
    }

        <Brackets
            {queryWeek}
            {leagueTeamManagers}
            {players}
            {brackets}
            bind:selection={selection}
        />

    {/if}

{/if}