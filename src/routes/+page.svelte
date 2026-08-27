<script>
    import LinearProgress from '@smui/linear-progress';

    import {
        getNflState,
        leagueName,
        getAwards,
        getLeagueTeamManagers,
        homepageText,
        managers,
        gotoManager,
        waitForAll
    } from '$lib/utils/helper';

    import { getAvatarFromTeamManagers, getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';

    const nflState = getNflState();
    const podiumsData = getAwards();
    const leagueTeamManagersData = getLeagueTeamManagers();
</script>

<style>
    #home {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        overflow-y: hidden;
        z-index: 1;
    }

    #main {
        flex-grow: 1;
        min-width: 320px;
        margin: 0 auto;
        padding: 20px 0;
    }

    .text {
        padding: 0 30px;
        max-width: 800px;
        margin: 0 auto;
    }

    .leagueData {
        position: relative;
        z-index: 1;
        width: 100%;
        min-width: 470px;
        max-width: 470px;
        min-height: 100%;
        background-color: var(--ebebeb);
        border-left: var(--eee);
        box-shadow: inset 8px 0px 6px -6px rgb(0 0 0 / 24%);
    }

    @media (max-width: 950px) {

        .leagueData {
            max-width: 100%;
            min-width: 100%;
            width: 100%;
            box-shadow: none;
        }

        #home {
            flex-wrap: wrap;
        }

    }

    .center {
        text-align: center;
    }

    h6 {
        text-align: center;
    }

    .homeBanner {
        background-color: var(--blueOne);
        color: #fff;
        padding: 0.5em 0;
        font-weight: 500;
        font-size: 1.5em;
    }

    /* Current champion */

    #currentChamp {
        padding: 25px 0;
        background-color: var(--f3f3f3);
        box-shadow: 5px 0 8px var(--champShadow);
        border-left: 1px solid var(--ddd);
    }

    #champ {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        cursor: pointer;
    }

    .first {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 100%;
        border: 1px solid #ccc;
        left: 50%;
        top: 43%;
    }

    .laurel {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 135px;
        height: auto;
        left: 50%;
        top: 50%;
    }

    h4 {
        text-align: center;
        font-size: 1.8em;
        margin: 10px;
        font-style: italic;
    }

    .label {
        display: table;
        text-align: center;
        line-height: 1.1em;
        font-size: 1.7em;
        margin: 6px auto 10px;
        cursor: pointer;
    }

    :global(.curOwner) {
        font-size: 0.75em;
        color: #bbb;
        font-style: italic;
    }

    /*
     * Division cards
     */

    .divisions {
        max-width: 800px;
        margin: 35px auto 0;
        padding: 0 20px;
    }

    .divisionGrid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    .divisionCard {
        display: block;
        text-align: center;
        text-decoration: none;
        color: inherit;
        background-color: var(--f3f3f3);
        border: 1px solid var(--ddd);
        padding: 20px 15px;
        transition: transform 0.15s ease;
    }

    .divisionCard:hover {
        transform: translateY(-2px);
    }

    .divisionLogo {
        width: 85px;
        height: 85px;
        object-fit: contain;
        margin-bottom: 8px;
    }

    .divisionCard h3 {
        margin: 5px 0;
        font-size: 1.15em;
    }

    .divisionCard p {
        margin: 5px 0 0;
        color: #888;
        font-size: 0.85em;
    }

    @media (max-width: 600px) {

        .text {
            padding: 0 20px;
        }

        .divisionGrid {
            grid-template-columns: 1fr;
        }

    }
</style>


<div id="home">

    <div id="main">

        <div class="text">

            <h6>{leagueName}</h6>

            {@html homepageText}

        </div>


        <!-- ================================================= -->
        <!-- CPL DIVISIONS -->
        <!-- ================================================= -->

        <div class="divisions">

            <div class="divisionGrid">

                <a
                    class="divisionCard"
                    href="/cpl"
                >

                    <img
                        class="divisionLogo"
                        src="/CPL-Red-logo.png"
                        alt="CPL Red"
                    />

                    <h3>
                        🔴 CPL Red
                    </h3>

                    <p>
                        Standings, matchups, rosters,
                        transactions and more.
                    </p>

                </a>


                <a
                    class="divisionCard"
                    href="/segunda"
                >

                    <img
                        class="divisionLogo"
                        src="/CPL-Green-logo.png"
                        alt="CPL Green"
                    />

                    <h3>
                        🟢 CPL Green
                    </h3>

                    <p>
                        Standings, matchups, rosters,
                        transactions and more.
                    </p>

                </a>

            </div>

        </div>

    </div>


    <!-- ===================================================== -->
    <!-- RIGHT SIDEBAR -->
    <!-- ===================================================== -->

    <div class="leagueData">

        <div class="homeBanner">

            {#await nflState}

                <div class="center">
                    Retrieving NFL state...
                </div>

                <LinearProgress indeterminate />

            {:then nflStateData}

                <div class="center">

                    NFL {nflStateData.season}

                    {#if nflStateData.season_type == 'pre'}

                        Preseason

                    {:else if nflStateData.season_type == 'post'}

                        Postseason

                    {:else}

                        Season -
                        {nflStateData.week > 0
                            ? `Week ${nflStateData.week}`
                            : 'Preseason'}

                    {/if}

                </div>

            {:catch error}

                <div class="center">
                    Something went wrong:
                    {error.message}
                </div>

            {/await}

        </div>


        <!-- ================================================= -->
        <!-- CURRENT CHAMPION -->
        <!-- ================================================= -->

        <div id="currentChamp">

            {#await waitForAll(
                podiumsData,
                leagueTeamManagersData
            )}

                <p class="center">
                    Retrieving awards...
                </p>

                <LinearProgress indeterminate />

            {:then [podiums, leagueTeamManagers]}

                {#if podiums[0]}

                    <h4>
                        {podiums[0].year} Fantasy Champ
                    </h4>

                    <div
                        id="champ"
                        onclick={() => {
                            if (managers.length) {
                                gotoManager({
                                    year: podiums[0].year,
                                    leagueTeamManagers,
                                    rosterID: parseInt(podiums[0].champion)
                                });
                            }
                        }}
                    >

                        <img
                            src={getAvatarFromTeamManagers(
                                leagueTeamManagers,
                                podiums[0].champion,
                                podiums[0].year
                            )}
                            class="first"
                            alt="champion"
                        />

                        <img
                            src="/laurel.png"
                            class="laurel"
                            alt="laurel"
                        />

                    </div>

                    <span
                        class="label"
                        onclick={() =>
                            gotoManager({
                                year: podiums[0].year,
                                leagueTeamManagers,
                                rosterID: parseInt(podiums[0].champion)
                            })
                        }
                    >

                        {getTeamFromTeamManagers(
                            leagueTeamManagers,
                            podiums[0].champion,
                            podiums[0].year
                        ).name}

                    </span>

                {:else}

                    <p class="center">
                        No former champs.
                    </p>

                {/if}

            {:catch error}

                <p class="center">
                    Something went wrong:
                    {error.message}
                </p>

            {/await}

        </div>

    </div>

</div>