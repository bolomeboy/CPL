<script>
    import Button, { Group, Label } from '@smui/button';
    import LinearProgress from '@smui/linear-progress';
    import { loadPlayers, getLeagueTransactions } from '$lib/utils/helper';

    import Roster from '../Rosters/Roster.svelte';
    import TransactionsPage from '../Transactions/TransactionsPage.svelte';

    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    import ManagerFantasyInfo from './ManagerFantasyInfo.svelte';
    import ManagerAwards from './ManagerAwards.svelte';

    import {
        getDatesActive,
        getRosterIDFromManagerID,
        getTeamNameFromTeamManagers
    } from '$lib/utils/helperFunctions/universalFunctions';


    export let manager;
    export let managers = [];
    export let managerID = null;
    export let rosterID = null;
    export let year = null;
    export let division = null;
    export let rostersData;
    export let leagueTeamManagers;
    export let rosterPositions;
    export let transactionsData;
    export let awards;
    export let records;


    let transactions =
        transactionsData?.transactions || [];


    /*
     * ============================================================
     * BUILD MANAGER
     * ============================================================
     */

    function buildSleeperManager(id) {

        const sleeperUser =
            leagueTeamManagers?.users?.[id];


        const profile =
            managers?.find(
                manager =>
                    String(
                        manager.managerID ??
                        manager.user_id
                    ) ===
                    String(id)
            );


        return {

            ...(profile || {}),

            managerID:
                String(id),

            name:
                profile?.name ||
                sleeperUser?.display_name ||
                sleeperUser?.user_name ||
                'Unknown Manager',

            fantasyStart:
                profile?.fantasyStart || null,

            favoriteTeam:
                profile?.favoriteTeam || null,

            bio:
                profile?.bio || '',

            philosophy:
                profile?.philosophy || '',

            mode:
                profile?.mode || null,

            tookOver:
                profile?.tookOver || null

        };

    }


    /*
     * ============================================================
     * CURRENT MANAGER
     * ============================================================
     */

    $: viewManager =
        managerID
            ? buildSleeperManager(
                String(managerID)
            )
            : managers?.[manager];


    /*
     * ============================================================
     * FIND ROSTER
     * ============================================================
     */

    $: managerRosterData =
        viewManager?.managerID
            ? getRosterIDFromManagerID(
                leagueTeamManagers,
                String(viewManager.managerID)
            )
            : null;


    $: finalRosterID =
        rosterID ||
        managerRosterData?.rosterID ||
        viewManager?.roster ||
        null;


    $: finalYear =
        year ||
        managerRosterData?.year ||
        leagueTeamManagers?.currentSeason ||
        null;


    /*
     * ============================================================
     * TEAM LOGO
     * ============================================================
     */

    $: managerPhoto = (() => {

        const team =
            leagueTeamManagers
                ?.teamManagersMap
                ?.[finalYear]
                ?.[finalRosterID]
                ?.team;


        if (team?.avatar) {

            return team.avatar;

        }


        const currentTeam =
            leagueTeamManagers
                ?.teamManagersMap
                ?.[leagueTeamManagers.currentSeason]
                ?.[finalRosterID]
                ?.team;


        if (currentTeam?.avatar) {

            return currentTeam.avatar;

        }


        return '/managers/question.jpg';

    })();


    /*
     * ============================================================
     * ACTIVE DATES
     * ============================================================
     */

    $: datesActive =
        viewManager?.managerID
            ? getDatesActive(
                leagueTeamManagers,
                String(viewManager.managerID)
            )
            : {
                start: null,
                end: null
            };


    /*
     * ============================================================
     * ROSTER
     * ============================================================
     */

    const startersAndReserve =
        rostersData.startersAndReserve;


    let rosters =
        rostersData.rosters;


    $: roster =
        finalRosterID
            ? rosters?.[finalRosterID]
            : null;


    /*
     * ============================================================
     * CO-OWNERS
     * ============================================================
     */

    $: coOwners =
        (
            finalYear &&
            finalRosterID &&
            leagueTeamManagers
                ?.teamManagersMap
                ?.[finalYear]
                ?.[finalRosterID]
                ?.managers
                ?.length > 1
        )
        ||
        (
            roster?.co_owners?.length > 0
        );


    /*
     * ============================================================
     * COMMISSIONER
     * ============================================================
     */

    $: commissioner =
        viewManager?.managerID &&
        leagueTeamManagers?.users?.[
            viewManager.managerID
        ]
            ? leagueTeamManagers
                .users[
                    viewManager.managerID
                ].is_owner
            : false;


    /*
     * ============================================================
     * TEAM TRANSACTIONS
     * ============================================================
     */

    $: teamTransactions =
        finalRosterID
            ? transactions.filter(
                t =>
                    t.rosters.includes(
                        parseInt(finalRosterID)
                    )
            )
            : [];


    /*
     * ============================================================
     * PLAYERS
     * ============================================================
     */

    let players;
    let playersInfo;
    let loading = true;


    const refreshTransactions = async () => {

        const newTransactions =
            await getLeagueTransactions(
                false,
                true
            );


        if (newTransactions) {

            transactions =
                newTransactions.transactions || [];

        }

    };


    onMount(async () => {

        if (transactionsData?.stale) {

            refreshTransactions();

        }


        const playerData =
            await loadPlayers(null);


        playersInfo =
            playerData;


        players =
            playerData.players;


        loading = false;


        if (playerData.stale) {

            const newPlayerData =
                await loadPlayers(
                    null,
                    true
                );


            playersInfo =
                newPlayerData;


            players =
                newPlayerData.players;

        }

    });


    /*
     * ============================================================
     * ALL-TIME RECORD
     * ============================================================
     *
     * Start with the current roster record.
     *
     * This automatically updates as the season progresses.
     *
     * Later, when CPL/Segunda historical records are connected
     * to manager IDs, this can become the full career record.
     */

    $: allTimeRecord = (() => {

        const currentRoster =
            finalRosterID
                ? rosters?.[finalRosterID]
                : null;


        if (!currentRoster) {

            return {
                wins: 0,
                losses: 0,
                ties: 0
            };

        }


        return {

            wins:
                Number(
                    currentRoster.settings?.wins
                ) || 0,

            losses:
                Number(
                    currentRoster.settings?.losses
                ) || 0,

            ties:
                Number(
                    currentRoster.settings?.ties
                ) || 0

        };

    })();


    /*
     * ============================================================
     * MANAGER NAVIGATION
     * ============================================================
     */

    function getManagerID(manager) {

        return manager?.managerID ||
               manager?.user_id ||
               null;

    }


    $: navigationManagers =
        (managers || [])
            .filter(
                manager =>
                    getManagerID(manager) !== null
            );


    $: currentManagerIndex =
        navigationManagers.findIndex(
            manager =>
                String(
                    getManagerID(manager)
                ) ===
                String(
                    managerID ||
                    viewManager?.managerID
                )
        );


    $: previousManager =
        currentManagerIndex > 0
            ? navigationManagers[
                currentManagerIndex - 1
            ]
            : null;


    $: nextManager =
        currentManagerIndex >= 0 &&
        currentManagerIndex <
            navigationManagers.length - 1
            ? navigationManagers[
                currentManagerIndex + 1
            ]
            : null;


    /*
     * ============================================================
     * CHANGE MANAGER
     * ============================================================
     */

    function changeManager(
        newManager,
        noscroll = false
    ) {

        const newManagerID =
            getManagerID(newManager);


        if (!newManagerID) {

            return;

        }


        const newDivision =
            newManager?.division === 'green'
                ? 'green'
                : 'red';


        const newURL =
            `/manager?managerID=${encodeURIComponent(
                String(newManagerID)
            )}&division=${newDivision}`;


        if (
            typeof window !== 'undefined'
        ) {

            window.location.href =
                newURL;

            return;

        }


        goto(
            newURL,
            {
                noscroll
            }
        );

    }

</script>


<style>

    .managerContainer {
        width: 100%;
        margin: 2em 0 5em;
    }


    .managerConstrained {
        width: 97%;
        max-width: 800px;
        margin: 0 auto 4em;
    }


    .managerPhoto {
        display: block;
        border-radius: 100%;
        width: 70%;
        max-width: 200px;
        height: auto;
        aspect-ratio: 1 / 1;
        margin: 5em auto 1em;
        box-shadow: 0 0 8px 4px #aaa;
        object-fit: cover;
    }


    h2 {
        text-align: center;
        font-size: 2.8em;
        margin: 1em 0 0em;
        line-height: 1em;
    }


    h3 {
        text-align: center;
        font-size: 1.5em;
        margin: 1.5em 0 0.5em;
        font-weight: 200;
    }


    .basicInfo {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 24px;
        margin: 2em 0;
    }


    .basicInfo span {
        color: #888;
        font-size: 0.9em;
    }


    .infoChild {
        font-style: italic;
    }


    .infoTeam {
        height: 48px;
    }


    .recordInfo {
        color: #888;
        font-style: italic;
        font-size: 0.9em;
        white-space: nowrap;
    }


    .bio {
        margin: 2em 1.5em 2em;
        text-indent: 4em;
    }


    .philosophy {
        margin: 2em 1.5em 2em;
        text-indent: 4em;
    }


    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }


    .teamSub {
        font-size: 0.4em;
        line-height: 1em;
        color: #666;
    }


    .managerNav {
        margin: 4em 0 2em;
        text-align: center;
    }


    .upper {
        margin-top: 0;
    }


    .commissionerBadge {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25px;
        width: 25px;
        font-weight: 600;
        border-radius: 15px;
        background-color: var(--blueTwo);
        border: 1px solid var(--blueOne);
    }


    .commissionerBadge span {
        font-style: normal;
        color: #fff;
    }


    @media (max-width: 505px) {

        :global(.selectionButtons span) {
            font-size: 0.8em;
        }

    }


    @media (max-width: 435px) {

        :global(.selectionButtons span) {
            line-height: 1.2em;
            font-size: 0.8em;
        }

    }


    @media (max-width: 450px) {

        .basicInfo {
            height: 20px;
        }


        .basicInfo span,
        .recordInfo {
            font-size: 0.75em;
        }


        .infoTeam {
            height: 30px;
        }

    }


    @media (max-width: 370px) {

        .basicInfo {
            height: 18px;
        }


        .basicInfo span,
        .recordInfo {
            font-size: 0.6em;
        }


        .infoTeam {
            height: 24px;
        }

    }

</style>


<div class="managerContainer">

    <div class="managerConstrained">


        <!-- ====================================================
             TEAM LOGO
             ==================================================== -->

        <img
            class="managerPhoto"
            src={managerPhoto}
            alt="team logo"
        />


        <!-- ====================================================
             MANAGER NAME / TEAM
             ==================================================== -->

        <h2>

            {viewManager?.name}

            <div class="teamSub">

                {coOwners ? 'Co-' : ''}

                Manager of

                <i>

                    {#if finalRosterID && finalYear}

                        {getTeamNameFromTeamManagers(
                            leagueTeamManagers,
                            finalRosterID,
                            finalYear
                        )}

                    {:else}

                        Team

                    {/if}

                </i>

            </div>

        </h2>


        <!-- ====================================================
             BASIC INFO
             ==================================================== -->

        <div class="basicInfo">


            <!-- ALL-TIME RECORD -->

            <span class="recordInfo">

                All-Time Record:

                {allTimeRecord.wins}
                -
                {allTimeRecord.losses}
                -
                {allTimeRecord.ties}

            </span>


            <!-- CPL LEAGUE LOGO -->

            <span class="seperator">
                |
            </span>


            <img
                class="infoChild infoTeam"
                src={
                    division === 'green'
                        ? '/CPL-Green-logo.png'
                        : '/CPL-Red-logo.png'
                }
                alt={
                    division === 'green'
                        ? 'CPL Green'
                        : 'CPL Red'
                }
            />


            <!-- FAVORITE NFL TEAM -->

            {#if viewManager?.favoriteTeam}

                <span class="seperator">
                    |
                </span>

                <img
                    class="infoChild infoTeam"
                    src="https://sleepercdn.com/images/team_logos/nfl/{viewManager.favoriteTeam}.png"
                    alt="favorite NFL team"
                />

            {/if}


            <!-- COMMISSIONER -->

            {#if commissioner}

                <span class="seperator">
                    |
                </span>

                <div class="infoChild commissionerBadge">

                    <span>
                        C
                    </span>

                </div>

            {/if}


        </div>


        <!-- ====================================================
             MANAGER NAVIGATION
             ==================================================== -->

        <div class="managerNav upper">

            <Group variant="outlined">


                {#if previousManager}

                    <Button
                        class="selectionButtons"
                        onclick={() =>
                            changeManager(
                                previousManager,
                                true
                            )}
                        variant="outlined"
                    >

                        <Label>
                            Previous Manager
                        </Label>

                    </Button>

                {:else}

                    <Button
                        disabled
                        class="selectionButtons"
                        variant="outlined"
                    >

                        <Label>
                            Previous Manager
                        </Label>

                    </Button>

                {/if}


                <Button
                    class="selectionButtons"
                    onclick={() =>
                        goto('/managers')}
                    variant="outlined"
                >

                    <Label>
                        All Managers
                    </Label>

                </Button>


                {#if nextManager}

                    <Button
                        class="selectionButtons"
                        onclick={() =>
                            changeManager(
                                nextManager,
                                true
                            )}
                        variant="outlined"
                    >

                        <Label>
                            Next Manager
                        </Label>

                    </Button>

                {:else}

                    <Button
                        disabled
                        class="selectionButtons"
                        variant="outlined"
                    >

                        <Label>
                            Next Manager
                        </Label>

                    </Button>

                {/if}

            </Group>

        </div>


        <!-- ====================================================
             BIO
             ==================================================== -->

        {#if viewManager?.bio}

            <p class="bio">
                {@html viewManager.bio}
            </p>

        {/if}


        <!-- ====================================================
             PHILOSOPHY
             ==================================================== -->

        {#if viewManager?.philosophy}

            <h3>
                Team Philosophy
            </h3>

            <p class="philosophy">
                {@html viewManager.philosophy}
            </p>

        {/if}


    </div>


    <!-- ========================================================
         FANTASY INFORMATION
         ======================================================== -->

    {#if !loading}

        <ManagerFantasyInfo
            {viewManager}
            {players}
            {changeManager}
        />

    {/if}


    <!-- ========================================================
         AWARDS / RECORDS
         ======================================================== -->

    <ManagerAwards
        {leagueTeamManagers}
        tookOver={viewManager?.tookOver}
        {awards}
        {records}
        rosterID={finalRosterID}
        managerID={viewManager?.managerID}
    />


    <!-- ========================================================
         ROSTER
         ======================================================== -->

    {#if loading}

        <div class="loading">

            <p>
                Retrieving players...
            </p>

            <LinearProgress indeterminate />

        </div>

    {:else}

        <Roster
            division="1"
            expanded={false}
            {rosterPositions}
            {roster}
            {leagueTeamManagers}
            {players}
            {startersAndReserve}
        />

    {/if}


    <!-- ========================================================
         TEAM TRANSACTIONS
         ======================================================== -->

    <h3>
        Team Transactions
    </h3>


    <div class="managerConstrained">

        {#if loading}

            <div class="loading">

                <p>
                    Retrieving players...
                </p>

                <LinearProgress indeterminate />

            </div>

        {:else}

            <TransactionsPage
                {playersInfo}
                transactions={teamTransactions}
                {leagueTeamManagers}
                show="both"
                query=""
                page={0}
                perPage={5}
            />

        {/if}

    </div>


    <!-- ========================================================
         BOTTOM NAVIGATION
         ======================================================== -->

    <div class="managerNav">

        <Group variant="outlined">


            {#if previousManager}

                <Button
                    class="selectionButtons"
                    onclick={() =>
                        changeManager(
                            previousManager
                        )}
                    variant="outlined"
                >

                    <Label>
                        Previous Manager
                    </Label>

                </Button>

            {:else}

                <Button
                    disabled
                    class="selectionButtons"
                    variant="outlined"
                >

                    <Label>
                        Previous Manager
                    </Label>

                </Button>

            {/if}


            <Button
                class="selectionButtons"
                onclick={() =>
                    goto('/managers')}
                variant="outlined"
            >

                <Label>
                    All Managers
                </Label>

            </Button>


            {#if nextManager}

                <Button
                    class="selectionButtons"
                    onclick={() =>
                        changeManager(
                            nextManager
                        )}
                    variant="outlined"
                >

                    <Label>
                        Next Manager
                    </Label>

                </Button>

            {:else}

                <Button
                    disabled
                    class="selectionButtons"
                    variant="outlined"
                >

                    <Label>
                        Next Manager
                    </Label>

                </Button>

            {/if}

        </Group>

    </div>

</div>