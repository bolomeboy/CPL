<script>
    import Button, { Group, Label } from '@smui/button';
    import LinearProgress from '@smui/linear-progress';
    import { loadPlayers, getLeagueTransactions } from '$lib/utils/helper';
    import Roster from '../Rosters/Roster.svelte';
    import TransactionsPage from '../Transactions/TransactionsPage.svelte';
    import { goto } from '$app/navigation';
    import ManagerFantasyInfo from './ManagerFantasyInfo.svelte';
    import ManagerAwards from './ManagerAwards.svelte';
    import { onMount } from 'svelte';

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

    let transactions = transactionsData.transactions;

    /*
     * ============================================================
     * BUILD MANAGER FROM SLEEPER
     * ============================================================
     */

    function buildSleeperManager(id) {

    const sleeperUser =
        leagueTeamManagers?.users?.[id];

    const profile =
        managers?.find(
            manager =>
                String(manager.managerID) === String(id)
        );

    return {

        ...(profile || {}),

        managerID: String(id),

        name:
            profile?.name ||
            sleeperUser?.display_name ||
            sleeperUser?.user_name ||
            'Unknown Manager',

        photo:
            profile?.photo ||
            (
                sleeperUser?.metadata?.avatar ||
                (
                    sleeperUser?.avatar
                        ? `https://sleepercdn.com/avatars/thumbs/${sleeperUser.avatar}`
                        : '/managers/question.jpg'
                )
            ),

        location:
            profile?.location || null,

        fantasyStart:
            profile?.fantasyStart || null,

        favoriteTeam:
            profile?.favoriteTeam || null,

        preferredContact:
            profile?.preferredContact || null,

        bio:
            profile?.bio || '',

        philosophy:
            profile?.philosophy || '',

        rival:
            profile?.rival || null,

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
            ? buildSleeperManager(String(managerID))
            : managers?.[manager];


    /*
     * ============================================================
     * FIND MANAGER ROSTER
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
        finalYear &&
        finalRosterID &&
        leagueTeamManagers
            ?.teamManagersMap
            ?.[finalYear]
            ?.[finalRosterID]
            ?.managers
            ?.length > 1
        ||
        roster?.co_owners?.length > 0;


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

        transactions =
            newTransactions.transactions;

    };


    onMount(async () => {

        if (transactionsData.stale) {
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
     * 24-MANAGER NAVIGATION
     * ============================================================
     *
     * We now navigate using the REAL Sleeper user ID.
     */

    function getManagerIndex() {

        if (!managerID || !managers?.length) {
            return -1;
        }

        return managers.findIndex(
            m =>
                String(m.user_id) ===
                String(managerID)
        );

    }


    $: currentManagerIndex =
        getManagerIndex();


    $: previousManager =
        currentManagerIndex > 0
            ? managers[currentManagerIndex - 1]
            : null;


    $: nextManager =
        currentManagerIndex >= 0 &&
        currentManagerIndex < managers.length - 1
            ? managers[currentManagerIndex + 1]
            : null;


    function changeManager(newManager, noscroll = false) {

        if (!newManager) {
            goto('/managers');
            return;
        }

        goto(
            `/manager?managerID=${encodeURIComponent(newManager.user_id)}&division=${encodeURIComponent(newManager.division)}`,
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

    .infoContact {
        height: 20px;
        vertical-align: middle;
        padding-left: 1em;
    }

    .infoTeam {
        height: 48px;
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

        .basicInfo span {
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

        .basicInfo span {
            font-size: 0.6em;
        }

        .infoTeam {
            height: 24px;
        }

    }
</style>


<div class="managerContainer">

    <div class="managerConstrained">

        <img
            class="managerPhoto"
            src={viewManager?.photo}
            alt="manager"
        />


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


        <div class="basicInfo">

            <span class="infoChild">

                {viewManager?.location ||
                    'Undisclosed Location'}

            </span>


            {#if datesActive?.start}

                <span class="seperator">|</span>

                {#if datesActive.end}

                    <span class="infoChild">

                        In the league from
                        '
                        {datesActive.start
                            .toString()
                            .substring(2)}

                        to

                        '
                        {datesActive.end
                            .toString()
                            .substring(2)}

                    </span>

                {:else}

                    <span class="infoChild">

                        In the league since
                        '
                        {datesActive.start
                            .toString()
                            .substring(2)}

                    </span>

                {/if}

            {/if}


            {#if viewManager?.preferredContact}

                <span class="seperator">|</span>

                <span class="infoChild">

                    {viewManager.preferredContact}

                    <img
                        class="infoChild infoContact"
                        src="/{viewManager.preferredContact}.png"
                        alt="preferred contact"
                    />

                </span>

            {/if}


            {#if viewManager?.favoriteTeam}

                <span class="seperator">|</span>

                <img
                    class="infoChild infoTeam"
                    src="https://sleepercdn.com/images/team_logos/nfl/{viewManager.favoriteTeam}.png"
                    alt="favorite team"
                />

            {/if}


            {#if commissioner}

                <span class="seperator">|</span>

                <div class="infoChild commissionerBadge">

                    <span>C</span>

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


        {#if viewManager?.philosophy}

            <h3>
                Team Philosophy
            </h3>

            <p class="philosophy">
                {@html viewManager.philosophy}
            </p>

        {/if}

    </div>


    {#if !loading}

        <ManagerFantasyInfo
            {viewManager}
            {players}
            {changeManager}
        />

    {/if}


    <ManagerAwards
        {leagueTeamManagers}
        tookOver={viewManager?.tookOver}
        {awards}
        {records}
        rosterID={finalRosterID}
        managerID={viewManager?.managerID}
    />


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
