<script>
    import { goto } from "$app/navigation";

    import {
        getDatesActive,
        getRosterIDFromManagerID,
        getTeamNameFromTeamManagers
    } from "$lib/utils/helperFunctions/universalFunctions";

    export let manager;
    export let leagueTeamManagers;

    let retired = false;

    const managerID =
        manager?.managerID ||
        manager?.user_id
            ? String(manager.managerID || manager.user_id)
            : null;

    let rosterID = null;
    let year = null;


    /*
     * ============================================================
     * FIND MANAGER ROSTER
     * ============================================================
     */

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

            rosterID =
                rosterInfo.rosterID;

            year =
                rosterInfo.year;

        }

    }


    /*
     * ============================================================
     * COMMISSIONER
     * ============================================================
     */

    const commissioner =
        manager?.is_owner === true ||
        leagueTeamManagers?.users?.[managerID]?.is_owner === true;


    /*
     * ============================================================
     * TEAM NAME
     * ============================================================
     */

    const teamName =
        rosterID !== null &&
        year !== null
            ? getTeamNameFromTeamManagers(
                leagueTeamManagers,
                rosterID,
                year
            )
            : 'Team';


    /*
     * ============================================================
     * TEAM LOGO
     * ============================================================
     *
     * This is the team's logo, NOT the manager's personal avatar.
     */

    const managerPhoto =
        manager?.photo ||
        manager?.sleeperAvatar ||
        manager?.metadata?.avatar ||
        (
            manager?.avatar
                ? `https://sleepercdn.com/avatars/thumbs/${manager.avatar}`
                : '/managers/question.jpg'
        );


    /*
     * ============================================================
     * CPL DIVISION
     * ============================================================
     */

    const division =
        manager?.division === 'green'
            ? 'green'
            : 'red';


    const divisionLogo =
        division === 'green'
            ? '/CPL-Green-Logo.png'
            : '/CPL-Red-logo.png';


    const divisionName =
        division === 'green'
            ? 'Green'
            : 'Red';


    /*
     * ============================================================
     * FAVORITE NFL TEAM ABBREVIATION
     * ============================================================
     *
     * These are the Sleeper NFL team IDs converted to the
     * familiar abbreviations shown underneath the logo.
     */

    const nflTeamAbbreviations = {

        ARI: 'ARI',
        ATL: 'ATL',
        BAL: 'BAL',
        BUF: 'BUF',
        CAR: 'CAR',
        CHI: 'CHI',
        CIN: 'CIN',
        CLE: 'CLE',
        DAL: 'DAL',
        DEN: 'DEN',
        DET: 'DET',
        GB: 'GB',
        HOU: 'HOU',
        IND: 'IND',
        JAX: 'JAX',
        KC: 'KC',
        LAC: 'LAC',
        LAR: 'LAR',
        LV: 'LV',
        MIA: 'MIA',
        MIN: 'MIN',
        NE: 'NE',
        NO: 'NO',
        NYG: 'NYG',
        NYJ: 'NYJ',
        PHI: 'PHI',
        PIT: 'PIT',
        SEA: 'SEA',
        SF: 'SF',
        TB: 'TB',
        TEN: 'TEN',
        WAS: 'WAS'

    };


    const favoriteTeamAbbreviation =
        manager?.favoriteTeam
            ? (
                nflTeamAbbreviations[
                    manager.favoriteTeam
                ] ||
                manager.favoriteTeam
            )
            : null;


    /*
     * ============================================================
     * OPEN MANAGER PROFILE
     * ============================================================
     */

    function openManager() {

        goto(
            `/manager?managerID=${encodeURIComponent(managerID)}&division=${encodeURIComponent(division)}`
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


    /*
     * ============================================================
     * MAIN TEAM LOGO
     * ============================================================
     */

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
        font-style: italic;
        line-height: 1.2em;
        color: var(--g555);
        font-weight: 300;
        margin-left: 1em;
    }


    .spacer {
        flex-grow: 1;
    }


    /*
     * ============================================================
     * INFO AREA
     * ============================================================
     */

    .info {
        display: flex;
        align-items: center;
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
        width: 30px;
        object-fit: contain;
    }


    /*
     * ============================================================
     * LABEL UNDER EACH LOGO
     * ============================================================
     */

    .infoLabel {
        display: block;
        margin-top: 3px;
        font-size: 0.72em;
        line-height: 1em;
        font-weight: 600;
        color: var(--g555);
    }


    .avatarHolder {
        display: inline-flex;
        position: relative;
    }


    /*
     * ============================================================
     * COMMISSIONER BADGE
     * ============================================================
     */

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
            margin: 0 0.4em;
            width: 56px;
        }


        .infoIcon {
            height: 30px;
            width: 30px;
        }


        .infoImg {
            height: 25px;
            width: 25px;
        }


        .infoLabel {
            font-size: 0.65em;
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
            margin: 0 0.4em;
            width: 49px;
        }


        .infoIcon {
            height: 25px;
            width: 25px;
        }


        .infoImg {
            height: 22px;
            width: 22px;
        }


        .infoLabel {
            font-size: 0.6em;
        }

    }


    @media (max-width: 370px) {

        .infoSlot {
            margin: 0 0.2em;
            width: 43px;
        }


        .infoIcon {
            height: 23px;
            width: 23px;
        }


        .infoImg {
            height: 20px;
            width: 20px;
        }


        .infoLabel {
            font-size: 0.55em;
        }

    }

</style>


<div
    class="manager"
    style="{retired
        ? 'background-image: url(/retired.png); background-color: var(--ddd)'
        : ''}"
    onclick={openManager}
>


    <!-- ========================================================
         TEAM LOGO
         ======================================================== -->

    <div class="avatarHolder">

        <img
            class="photo"
            src={managerPhoto}
            alt="team logo"
        />


        {#if commissioner}

            <div class="commissionerBadge">

                <span>
                    C
                </span>

            </div>

        {/if}

    </div>


    <!-- ========================================================
         MANAGER NAME
         ======================================================== -->

    <div class="name">
        {manager.name}
    </div>


    <!-- ========================================================
         TEAM NAME
         ======================================================== -->

    <div class="team">
        {teamName}
    </div>


    <div class="spacer"></div>


    <!-- ========================================================
         INFO
         ======================================================== -->

    <div class="info">


        <!-- ====================================================
             FAVORITE NFL TEAM
             ==================================================== -->

        {#if manager.favoriteTeam}

            <div class="infoSlot">

                <div class="infoIcon">

                    <img
                        class="infoImg"
                        src="https://sleepercdn.com/images/team_logos/nfl/{manager.favoriteTeam}.png"
                        alt="Favorite NFL team"
                    />

                </div>


                <span class="infoLabel">
                    {favoriteTeamAbbreviation}
                </span>

            </div>

        {/if}


        <!-- ====================================================
             CPL DIVISION
             ==================================================== -->

        <div class="infoSlot">

            <div class="infoIcon">

                <img
                    class="infoImg"
                    src={divisionLogo}
                    alt={division === 'green'
                        ? 'CPL Green'
                        : 'CPL Red'}
                />

            </div>


            <span class="infoLabel">
                {divisionName}
            </span>

        </div>


    </div>

</div>
