<script>
    import { gotoManager } from '$lib/utils/helper';
    import { Row, Cell } from '@smui/data-table';

    export let columnOrder;
    export let team;
    export let standing;
    export let leagueTeamManagers;

    /*
     * "cpl" means this team is currently in the
     * top six during the 2026 season.
     */

    export let placement = null;


    /*
     * Apply the playoff highlight only to the
     * top six teams.
     */

    $: rowClass =
        placement === 'cpl'
            ? 'contrastRow playoffRow'
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
     *
     * Same subtle green highlight used by TBD.
     */

    :global(.playoffRow) {
        background-color: rgba(76, 175, 80, 0.22) !important;
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
