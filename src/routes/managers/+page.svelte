<script>
    import LinearProgress from '@smui/linear-progress';
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
        width: 95%;
        max-width: 900px;
        margin: 40px auto;
    }

    h1 {
        text-align: center;
    }

    .manager {
        padding: 15px;
        margin: 10px 0;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
</style>

<div class="main">

    <h1>Managers</h1>

    {#if managers && managers.length}

        <p>
            Found {managers.length} managers.
        </p>

        {#each managers as manager}
            <div class="manager">
                <strong>{manager.display_name}</strong>
                <br />
                <small>
                    {manager.user_id}
                    — {manager.division}
                </small>
            </div>
        {/each}

    {:else}

        <p>No managers found.</p>

    {/if}

</div>
