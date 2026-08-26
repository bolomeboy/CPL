<script>
    import { waitForAll } from '$lib/utils/helper';
    import LinearProgress from '@smui/linear-progress';
    import Draft from './Draft.svelte';

    export let upcomingDraftData;
    export let previousDraftsData;
    export let leagueTeamManagersData;
    export let playersData;

    export let leagueName = '';
    export let logo = '';
</script>

<style>
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }

    h4 {
        text-align: center;
    }

    h6 {
        text-align: center;
    }

    .leagueHeader {
        text-align: center;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    .leagueLogo {
        width: 90px;
        height: 90px;
        object-fit: contain;
        margin-bottom: 8px;
    }

    .leagueHeader h3 {
        margin: 0;
    }

    .divider {
        margin: 40px 0;
    }
</style>


{#await waitForAll(
    upcomingDraftData,
    leagueTeamManagersData,
    playersData
)}

    <div class="loading">

        <p>
            Retrieving {leagueName} draft...
        </p>

        <br />

        <LinearProgress indeterminate />

    </div>

{:then [upcomingDraft, leagueTeamManagers, {players}]}

    <div class="leagueHeader">

        {#if logo}
            <img
                class="leagueLogo"
                src={logo}
                alt="{leagueName} logo"
            />
        {/if}

        <h3>{leagueName}</h3>

    </div>

    <h4>
        {upcomingDraft.year} Draft
    </h4>

    <Draft
        draftData={upcomingDraft}
        {leagueTeamManagers}
        year={upcomingDraft.year}
        {players}
    />

{:catch error}

    <p>
        Something went wrong: {error.message}
    </p>

{/await}


{#await waitForAll(
    previousDraftsData,
    leagueTeamManagersData,
    playersData
)}

{:then [previousDrafts, leagueTeamManagers, {players}]}

    {#if previousDrafts.length}

        <hr class="divider" />

        <h4>
            {leagueName} Previous Drafts
        </h4>

        {#each previousDrafts as previousDraft}

            <h6>
                {previousDraft.year} Draft
            </h6>

            <Draft
                draftData={previousDraft}
                previous={true}
                {leagueTeamManagers}
                year={previousDraft.year}
                {players}
            />

        {/each}

    {/if}

{:catch error}

    <p>
        Something went wrong: {error.message}
    </p>

{/await}
