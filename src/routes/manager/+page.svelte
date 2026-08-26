<script>
    import LinearProgress from '@smui/linear-progress';
    import { Manager } from '$lib/components';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    export let data;

    const {
        managers,
        manager,
        managerID,
        rosterID,
        year,
        division,
        managersInfo
    } = data;

    onMount(() => {
        if (!managers.length) {
            goto('/');
        }

        // Only redirect if we have neither an old manager
        // index nor a new Sleeper manager ID.
        if (manager < 0 && !managerID) {
            goto('/managers');
        }
    });
</script>

<style>
    .main {
        position: relative;
        z-index: 1;
    }

    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>

<div class="main">

    {#await managersInfo}

        <div class="loading">
            <p>Retrieving managers...</p>
            <LinearProgress indeterminate />
        </div>

    {:then [rostersData, leagueTeamManagers, leagueData, transactionsData, awards, records]}

        {#if managers.length && (manager > -1 || managerID)}

            <Manager
                {awards}
                {records}
                {manager}
                {managers}
                {managerID}
                {rosterID}
                {year}
                {division}
                {rostersData}
                {leagueTeamManagers}
                rosterPositions={leagueData.roster_positions}
                {transactionsData}
            />

        {/if}

    {:catch error}

        <p>Something went wrong: {error.message}</p>

    {/await}

</div>
