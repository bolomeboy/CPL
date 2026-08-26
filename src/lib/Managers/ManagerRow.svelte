<script>
    import { goto } from "$app/navigation";
    import {
        getDatesActive,
        getRosterIDFromManagerID,
        getTeamNameFromTeamManagers
    } from "$lib/utils/helperFunctions/universalFunctions";

    import { dynasty } from "$lib/utils/leagueInfo";

    export let manager;
    export let leagueTeamManagers;
    export let key;

    let retired = false;

    /*
     * New manager data comes directly from Sleeper.
     */
    const managerID =
        manager?.user_id
            ? String(manager.user_id)
            : null;

    /*
     * Find this manager's roster in the correct
     * Red or Green league.
     */
    let rosterID = null;
    let year = null;

    if (managerID && leagueTeamManagers) {

        const dates =
            getDatesActive(
                leagueTeamManagers,
                managerID
            );

        if (dates?.end) {
            retired = true;
        }

        const rosterInfo =
            getRosterIDFromManagerID(
                leagueTeamManagers,
                managerID
            );

        if (rosterInfo) {
            rosterID = rosterInfo.rosterID;
            year = rosterInfo.year;
        }
    }


    /*
     * Commissioner status comes directly from Sleeper.
     */
    const commissioner =
        manager?.is_owner === true;


    /*
     * Sleeper avatar.
     */
    const avatar =
        manager?.metadata?.avatar ||
        (
            manager?.avatar
                ? `https://sleepercdn.com/avatars/thumbs/${manager.avatar}`
                : '/managers/question.jpg'
        );


    /*
     * Sleeper team name.
     */
    let teamName = 'Team';

    if (
        leagueTeamManagers &&
        rosterID &&
        year &&
        leagueTeamManagers.teamManagersMap?.[year]?.[rosterID]
    ) {

        teamName =
            getTeamNameFromTeamManagers(
                leagueTeamManagers,
                rosterID,
                year
            );
    }
</script>

<style>
    .manager {
        display: flex;
        justify-content: left;
        align-items: center;
        padding: 1em 0;
        background-color: var(--fff);
        background-repeat: no-repeat;
        background-position: 15% 50%;
        margin: 0.5em 0;
        border-radius: 2em;
        border: 1px solid var(--ccc);
        box-shadow: 0 0 6px 0 var(--bbb);
        cursor: pointer;
    }

    .manager:hover {
        box-shadow: 0 0 10px 0 var(--g999);
        background-color: var(--eee);
    }

    .photo {
        height: 40px;
        width: 40px;
        border-radius: 100%;
        vertical-align: middle;
        margin-left: 1em;
        box-shadow: 0 0 2px 1px var(--bbb);
        object-fit: cover;
    }

    .name {
        text-align: center;
        display: inline-block;
        color: var(--g555);
        line-height: 1.2em;
        margin-left: 1em;
        font-weight: 700;
    }

    .team {
        text-align: center;
        display: inline-block;
        font-style: italic;
        line-height: 1.2em;
        color: var(--g555);
        font-weight: 300;
        margin-left: 1em;
    }

    .spacer {
        flex-grow: 1;
    }

    .info {
        display: flex;
    }

    .infoSlot {
        text-align: center;
        margin: 0 0.5em;
        width: 63px;
    }

    .infoIcon {
        display: inline-flex;
        height: 40px;
        width: 40px;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        border: 1px solid #ccc;
        overflow: hidden;
        background-color: var(--fff);
    }

    .infoImg {
        height: 30px;
    }

    .infoAnswer {
        font-size: 0.8em;
        color: var(--g555);
        width: 63px;
        text-align: center;
        line-height: 1.2em;
    }

    .avatarHolder {
        display: inline-flex;
        position: relative;
    }

    .commissionerBadge {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: -10px;
        right: -10px;
        height: 25px;
        width: 25px;
        font-weight: 600;
        border-radius: 15px;
        background-color: var(--blueTwo);
        border: 1px solid var(--blueOne);
        color: #fff;
    }

    @media (max-width: 665px) {
        .name {
            font-size: 0.9em;
            margin-left: 0.5em;
        }

        .team {
            font-size: 0.8em;
            margin-left: 0.5em;
        }
    }

    @media (max-width: 595px) {
        .manager {
            padding: 0.5em 0;
            margin: 0.3em 0;
            border-radius: 1.5em;
        }

        .photo {
            height: 30px;
            width: 30px;
            margin-left: 0.5em;
        }

        .commissionerBadge {
            height: 15px;
            width: 15px;
            font-size: 0.8em;
        }

        .infoSlot {
            text-align: center;
            margin: 0 0.4em;
            width: 56px;
        }

        .infoIcon {
            height: 30px;
            width: 30px;
        }

        .infoImg {
            height: 25px;
        }

        .infoAnswer {
            font-size: 0.7em;
            width: 56px;
        }
    }

    @media (max-width: 475px) {
        .name {
            font-size: 0.8em;
            margin-left: 0.4em;
        }

        .team {
            font-size: 0.7em;
            margin-left: 0.4em;
        }

        .photo {
            height: 25px;
            width: 25px;
        }

        .infoSlot {
            text-align: center;
            margin: 0 0.4em;
            width: 49px;
        }

        .infoIcon {
            height: 25px;
            width: 25px;
        }

        .infoImg {
            height: 22px;
        }

        .infoAnswer {
            font-size: 0.6em;
            width: 49px;
        }
    }

    @media (max-width: 370px) {
        .infoTeam {
            display: none;
        }
    }

    .question {
        background-color: #fff;
    }
</style>


<div
    class="manager"
    style="{retired
        ? 'background-image: url(/retired.png); background-color: var(--ddd)'
        : ''}"
    onclick={() =>
        goto(
            `/manager?managerID=${encodeURIComponent(managerID)}&division=${encodeURIComponent(manager.division)}${rosterID ? `&rosterID=${encodeURIComponent(rosterID)}` : ''}${year ? `&year=${encodeURIComponent(year)}` : ''}`
        )
    }
>

    <div class="avatarHolder">

        <img
            class="photo"
            src={avatar}
            alt="{manager.display_name} avatar"
        />

        {#if commissioner}

            <div class="commissionerBadge">
                <span>C</span>
            </div>

        {/if}

    </div>


    <div class="name">
        {manager.display_name}
    </div>


    <div class="team">
        {teamName}
    </div>


    <div class="spacer" />


    <div class="info">

        <!-- Favorite team -->
        <div class="infoSlot infoTeam">

            <div class="infoIcon question">

                <img
                    class="infoImg"
                    src="/managers/question.jpg"
                    alt="favorite team"
                />

            </div>

        </div>


        <!-- Preferred contact -->
        <div class="infoSlot">

            <div class="infoIcon question">

                <img
                    class="infoImg"
                    src="/managers/question.jpg"
                    alt="preferred contact"
                />

            </div>

        </div>


        <!-- Rebuild mode -->
        {#if dynasty}

            <div class="infoSlot infoRebuild">

                <div class="infoIcon question">

                    <img
                        class="infoImg"
                        src="/managers/question.jpg"
                        alt="rebuild mode"
                    />

                </div>

            </div>

        {/if}

    </div>

</div>
