<script>
    import { AllManagers } from '$lib/components';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export let data;

    const { managers } = data;

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
        />
    {/if}

</div>
