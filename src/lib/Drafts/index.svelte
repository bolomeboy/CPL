<script>
    import { waitForAll } from '$lib/utils/helper';
    import LinearProgress from '@smui/linear-progress';
    import Draft from './Draft.svelte';

    export let previousDraftsData;
    export let leagueTeamManagersData;
    export let playersData;

    export let leagueName = '';
    export let logo = '';
    export let division = 'red';
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

    .nothingYet {
        text-align: center;
        margin: 50px 0;
    }
</style>


{#if leagueName}

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

{/if}


<!-- ========================================================= -->
<!-- PREVIOUS / COMPLETED DRAFTS ONLY -->
<!-- ========================================================= -->

{#await waitForAll(
    previousDraftsData,
    leagueTeamManagersData,
    playersData
)}

    <div class="loading">

        <p>
            Retrieving {leagueName} drafts...
        </p>

        <LinearProgress indeterminate />

    </div>

{:then [previousDrafts, leagueTeamManagers, {players}]}

    {#if previousDrafts.length}

        <h4>
            {leagueName} Draft History
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
                {division}
            />

            {#if previousDraft !== previousDrafts[previousDrafts.length - 1]}

                <hr class="divider" />

            {/if}

        {/each}

    {:else}

        <p class="nothingYet">
            No completed drafts yet.
        </p>

    {/if}

{:catch error}

    <p>
        Something went wrong: {error.message}
    </p>

{/await}
