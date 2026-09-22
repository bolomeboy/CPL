<script>
    import { gotoManager } from '$lib/utils/helper';
    import { Row, Cell } from '@smui/data-table';
    import { managers } from '$lib/utils/leagueInfo';

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


    /*
     * Find the Sleeper manager ID attached to this roster.
     */

    $: rosterManagerID =
        leagueTeamManagers?.teamManagersMap?.[
            leagueTeamManagers?.currentSeason
        ]?.[standing.rosterID]?.managers?.[0];


    /*
     * Match that Sleeper ID to the manager information
     * entered manually in leagueInfo.js.
     */

    $: managerInfo =
        managers.find(
            (manager) =>
                String(manager.managerID) ===
                String(rosterManagerID)
        );


    /*
     * Use the manager's real name from leagueInfo.js.
     */

    $: managerName = managerInfo?.name || '';

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
     */

    :global(.playoffRow) {
        background-color: rgba(76, 175, 80, 0.22) !important;
    }


    .team {
        text-align: center;
    }


    .teamName {
        font-weight: 500;
        line-height: 1.2;
    }


    .managerName {
        font-size: 0.8rem;
        opacity: 0.7;
        margin-top: 3px;
        line-height: 1.2;
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

            <div class="teamName">
                {team.name}
            </div>

            {#if managerName}

                <div class="managerName">
                    {managerName}
                </div>

            {/if}

        </div>

    </Cell>


    {#each columnOrder as column}

        <Cell class="center">

            {standing[column.field]}

        </Cell>

    {/each}

</Row>
