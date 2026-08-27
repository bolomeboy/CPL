<script>
    import LinearProgress from '@smui/linear-progress';
    import { Manager } from '$lib/components';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    export let data;

    const {
        manager,
        managerID,
        rosterID,
        year,
        division,
        managers,
        managersInfo
    } = data;

    onMount(() => {

        if (!managerID) {
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

    {#if managersInfo}

        {#await managersInfo}

            <div class="loading">
                <p>Retrieving manager...</p>
                <LinearProgress indeterminate />
            </div>

        {:then [rostersData, leagueTeamManagers, leagueData, transactionsData, awards, records]}

            <Manager
                {awards}
                {records}
                {manager}
                {managerID}
                {rosterID}
                {year}
                {division}
                {managers}
                {rostersData}
                {leagueTeamManagers}
                rosterPositions={leagueData.roster_positions}
                {transactionsData}
            />

        {:catch error}

            <p>Something went wrong: {error.message}</p>

        {/await}

    {/if}

</div>
