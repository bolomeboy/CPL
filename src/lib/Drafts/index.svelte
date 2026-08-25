<script>
    import { waitForAll } from '$lib/utils/helper';
    import LinearProgress from '@smui/linear-progress';
    import Draft from './Draft.svelte';

    export let cplDraftsData;
    export let cplPreviousDraftsData;
    export let leagueTeamManagersData;
    export let playersData;
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

    h5 {
        text-align: center;
        font-size: 1.15em;
        margin-top: 30px;
        margin-bottom: 10px;
    }

    h6 {
        text-align: center;
    }

    .leagueSection {
        margin-bottom: 40px;
    }

    .redTitle {
        color: #b00000;
    }

    .greenTitle {
        color: #008c45;
    }
</style>


{#await waitForAll(cplDraftsData, leagueTeamManagersData, playersData)}
    <div class="loading">
        <p>Retrieving CPL Red and CPL Green drafts...</p>
        <br />
        <LinearProgress indeterminate />
    </div>

{:then [{ redDraft, greenDraft }, leagueTeamManagers, { players }]}

    <h4>📝 2026 Inaugural Drafts</h4>


    <!-- CPL RED -->

    <div class="leagueSection">

        <h5 class="redTitle">
            🔴 CPL Red
        </h5>

        {#if redDraft}
            <Draft
                draftData={redDraft}
                leagueTeamManagers={leagueTeamManagers}
                year={redDraft.year}
                {players}
            />
        {:else}
            <p style="text-align: center;">
                CPL Red draft information is not available yet.
            </p>
        {/if}

    </div>


    <hr />


    <!-- CPL GREEN -->

    <div class="leagueSection">

        <h5 class="greenTitle">
            🟢 CPL Green
        </h5>

        {#if greenDraft}
            <Draft
                draftData={greenDraft}
                leagueTeamManagers={leagueTeamManagers}
                year={greenDraft.year}
                {players}
            />
        {:else}
            <p style="text-align: center;">
                CPL Green draft information is not available yet.
            </p>
        {/if}

    </div>


    <!-- PREVIOUS DRAFTS -->

    {#await waitForAll(cplPreviousDraftsData, leagueTeamManagersData, playersData)}
        <hr />

        <h4>Previous Drafts</h4>

        <div class="loading">
            <p>Retrieving previous drafts...</p>
            <br />
            <LinearProgress indeterminate />
        </div>

    {:then [{ redDrafts, greenDrafts }, leagueTeamManagers, { players }]}

        {#if redDrafts.length || greenDrafts.length}

            <hr />

            <h4>Previous Drafts</h4>

            {#if redDrafts.length}
                <h5 class="redTitle">🔴 CPL Red</h5>

                {#each redDrafts as previousDraft}
                    <h6>{previousDraft.year} Draft</h6>

                    <Draft
                        draftData={previousDraft}
                        previous={true}
                        {leagueTeamManagers}
                        year={previousDraft.year}
                        {players}
                    />
                {/each}
            {/if}


            {#if greenDrafts.length}
                <h5 class="greenTitle">🟢 CPL Green</h5>

                {#each greenDrafts as previousDraft}
                    <h6>{previousDraft.year} Draft</h6>

                    <Draft
                        draftData={previousDraft}
                        previous={true}
                        {leagueTeamManagers}
                        year={previousDraft.year}
                        {players}
                    />
                {/each}
            {/if}

        {/if}

    {:catch error}

        <p>Something went wrong: {error.message}</p>

    {/await}

{:catch error}

    <p>Something went wrong: {error.message}</p>

{/await}
