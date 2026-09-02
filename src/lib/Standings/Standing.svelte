<script>
    import { gotoManager } from '$lib/utils/helper';
    import { Row, Cell } from '@smui/data-table';

    export let columnOrder;
    export let team;
    export let standing;
    export let leagueTeamManagers;

    // 2026 only:
    // "cpl" = top 6
    // "segunda" = bottom 6
    export let placement = null;

    $: rowClass =
        placement === 'cpl'
            ? 'contrastRow futureCplRow'
            : placement === 'segunda'
                ? 'contrastRow futureSegundaRow'
                : 'contrastRow';
</script>

<style>
    .clickable {
        cursor: pointer;
    }

    .teamAvatar {
        vertical-align: middle;
        border-radius: 50%;
        height: 40px;
        margin-right: 15px;
        border: 0.25px solid #777;
    }

    :global(.contrastRow) {
        background-color: var(--f8f8f8);
    }

    /*
     * 2026 TOP 6
     * These teams will enter the 2027 CPL.
     */
    :global(.futureCplRow) {
        background-color: rgba(0, 49, 107, 0.07) !important;
    }

    /*
     * 2026 BOTTOM 6
     * These teams will enter the 2027 Segunda Liga.
     */
    :global(.futureSegundaRow) {
        background-color: rgba(128, 128, 128, 0.04) !important;
    }

    .team {
        text-align: center;
    }
</style>

<Row class={rowClass}>
    <Cell>
        <div
            class="clickable team"
            onclick={() =>
                gotoManager({
                    leagueTeamManagers,
                    rosterID: standing.rosterID
                })}
        >
            <img
                alt="team avatar"
                class="teamAvatar clickable"
                src={team.avatar}
            />

            <div>
                {team.name}
            </div>
        </div>
    </Cell>

    {#each columnOrder as column}
        <Cell class="center">
            {standing[column.field]}
        </Cell>
    {/each}
</Row>