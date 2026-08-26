<script>
    import { AllManagers } from '$lib/components';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export let data;

    const {
        managers,
        redLeagueTeamManagers,
        greenLeagueTeamManagers
    } = data;

    onMount(() => {
        if (!managers || !managers.length) {
            goto('/');
        }
    });
</script>

<style>
    .main {
        position: relative;
        z-index: 1;
    }
</style>

<div class="main">

    {#if managers && managers.length}

        <AllManagers
            {managers}
            leagueTeamManagers={{
                red: redLeagueTeamManagers,
                green: greenLeagueTeamManagers
            }}
        />

    {/if}

</div>
