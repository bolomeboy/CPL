<script>
    const promotionSpots = 4;
    const automaticRelegationSpots = 2;
    const toiletBowlSpots = 2;
</script>

<svelte:head>
    <title>Promotion & Relegation</title>
</svelte:head>

<style>
    #page {
        max-width: 1000px;
        margin: 0 auto;
        padding: 30px 20px;
    }

    .header {
        text-align: center;
        margin-bottom: 28px;
    }

    .header h1 {
        margin: 0;
        font-size: 1.9em;
    }

    .header p {
        margin: 7px 0 0;
        color: #888;
        font-size: 0.95em;
    }

    .division {
        margin-bottom: 28px;
    }

    .divisionHeader {
        background-color: var(--blueOne);
        color: #fff;
        padding: 9px 15px;
        font-size: 1.15em;
        font-weight: 600;
        text-align: center;
    }

    .divisionSubheader {
        text-align: center;
        color: #888;
        margin: 7px 0 14px;
        font-size: 0.9em;
    }

    .promotionBox,
    .relegationBox,
    .toiletBowl,
    .formation {
        border: 1px solid var(--ddd);
        background-color: var(--f3f3f3);
        padding: 18px;
    }

    .promotionBox {
        border-top: 3px solid #4d8c5a;
    }

    .relegationBox {
        border-top: 3px solid #b54b4b;
    }

    .promotionBox h2,
    .relegationBox h2,
    .toiletBowl h2,
    .formation h2 {
        margin: 0 0 8px;
        font-size: 1.25em;
        text-align: center;
    }

    .promotionBox p,
    .relegationBox p,
    .toiletBowlIntro,
    .formation p {
        margin: 7px 0;
        line-height: 1.45;
        font-size: 0.92em;
    }

    /* PROMOTION */

    .promotionList {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-top: 15px;
    }

    .promotionSpot,
    .relegationSpot {
        background-color: var(--ebebeb);
        border: 1px solid var(--ddd);
        padding: 11px 8px;
        text-align: center;
        font-size: 0.9em;
        font-weight: 600;
    }

    /* DIVISION ARROW */

    .arrow {
        text-align: center;
        font-size: 25px;
        margin: 15px 0;
    }

    /* AUTOMATIC RELEGATION */

    .relegationList {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        margin-top: 15px;
    }

    /* TOILET BOWL */

    .toiletBowl {
        margin-top: 15px;
    }

    .toiletBowlIntro {
        margin: 7px 0 18px;
    }

    .bracket {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-top: 15px;
    }

    .matchupBox {
        background-color: var(--ebebeb);
        border: 1px solid var(--ddd);
        padding: 18px;
    }

    .matchupBox h3 {
        margin: 0 0 18px;
        text-align: center;
        font-size: 1.05em;
    }

    .matchupSection {
        padding: 12px 0;
        border-bottom: 1px solid var(--ddd);
    }

    .matchupSection:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .matchupTitle {
        font-size: 1.05em;
        font-weight: 700;
        margin-bottom: 8px;
        text-align: center;
    }

    .matchupResult {
        margin: 4px 0;
        font-size: 0.9em;
        line-height: 1.4;
        text-align: center;
    }

    .survives {
        font-weight: 600;
    }

    .relegated {
        font-weight: 600;
    }

    .note {
        margin-top: 18px;
        padding: 12px 14px;
        border-left: 3px solid var(--blueOne);
        background-color: var(--ebebeb);
        font-size: 0.88em;
        line-height: 1.45;
    }

    /* FORMATION */

    .formation {
        margin-top: 28px;
    }

    .formation h2 {
        text-align: left;
    }

    .formation ul {
        margin: 8px 0 0;
        padding-left: 22px;
    }

    .formation li {
        margin: 6px 0;
        font-size: 0.92em;
        line-height: 1.45;
    }

    /* MOBILE */

    @media (max-width: 700px) {
        #page {
            padding: 22px 14px;
        }

        .header h1 {
            font-size: 1.65em;
        }

        .promotionList {
            grid-template-columns: repeat(2, 1fr);
        }

        .bracket {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 450px) {
        .promotionList,
        .relegationList {
            grid-template-columns: 1fr;
        }
    }
</style>


<div id="page">

    <!-- PAGE HEADER -->

    <div class="header">

        <h1>Promotion & Relegation</h1>

        <p>
            The system connecting the California Primeira Liga and Segunda Liga
        </p>

    </div>


    <!-- SEGUNDA LIGA PROMOTION -->

    <div class="division">

        <div class="divisionHeader">
            ⬆️ SEGUNDA LIGA → CPL
        </div>

        <div class="divisionSubheader">
            Four teams are promoted every season
        </div>

        <div class="promotionBox">

            <h2>🏆 Promotion</h2>

            <p>
                The four teams that reach the Segunda Liga playoff
                semifinals are promoted to the CPL for the following season.
            </p>

            <div class="promotionList">

                <div class="promotionSpot">
                    🥇 1st Place
                </div>

                <div class="promotionSpot">
                    🥈 2nd Place
                </div>

                <div class="promotionSpot">
                    🥉 3rd Place
                </div>

                <div class="promotionSpot">
                    🏈 4th Place
                </div>

            </div>

        </div>

    </div>


    <!-- DIVISION ARROW -->

    <div class="arrow">
        ⬆️ &nbsp; ⬇️
    </div>


    <!-- CPL RELEGATION -->

    <div class="division">

        <div class="divisionHeader">
            ⬇️ CPL → SEGUNDA LIGA
        </div>

        <div class="divisionSubheader">
            Four teams are relegated every season
        </div>


        <!-- AUTOMATIC RELEGATION -->

        <div class="relegationBox">

            <h2>🔻 Automatic Relegation</h2>

            <p>
                The 11th and 12th place teams in the CPL are automatically
                relegated to the Segunda Liga.
            </p>

            <div class="relegationList">

                <div class="relegationSpot">
                    11th Place
                </div>

                <div class="relegationSpot">
                    12th Place
                </div>

            </div>

        </div>


        <!-- TOILET BOWL -->

        <div class="toiletBowl">

            <h2>🚽 CPL Toilet Bowl</h2>

            <p class="toiletBowlIntro">
                Teams finishing <strong>7th–10th</strong> enter the Toilet Bowl
                to determine the two additional relegation spots.
            </p>


            <div class="bracket">

                <!-- WEEK 15 -->

                <div class="matchupBox">

                    <h3>Week 15</h3>


                    <div class="matchupSection">

                        <div class="matchupTitle">
                            7th vs. 8th
                        </div>

                        <div class="matchupResult survives">
                            🏆 Winner stays in the CPL
                        </div>

                        <div class="matchupResult">
                            Loser gets another chance
                        </div>

                    </div>


                    <div class="matchupSection">

                        <div class="matchupTitle">
                            9th vs. 10th
                        </div>

                        <div class="matchupResult relegated">
                            🔻 Loser is relegated
                        </div>

                        <div class="matchupResult">
                            Winner gets another chance
                        </div>

                    </div>

                </div>


                <!-- WEEK 16 -->

                <div class="matchupBox">

                    <h3>Week 16 — Relegation Round</h3>


                    <div class="matchupSection">

                        <div class="matchupTitle">
                            Loser of 7th/8th
                            <br>
                            vs.
                            <br>
                            Winner of 9th/10th
                        </div>

                        <div class="matchupResult survives">
                            🏆 Winner stays in the CPL
                        </div>

                        <div class="matchupResult relegated">
                            🔻 Loser is relegated
                        </div>

                    </div>

                </div>

            </div>


            <!-- TOILET BOWL EXPLANATION -->

            <div class="note">

                <strong>How it works:</strong>

                The winner of the 7th vs. 8th matchup stays in the CPL
                for the following season, while the loser gets another
                chance to avoid relegation.

                The 9th vs. 10th matchup is win-or-go-home. The loser
                is immediately relegated to the Segunda Liga, while the
                winner advances to the Relegation Round.

                In the Relegation Round, the winner stays in the CPL
                and the loser is relegated to the Segunda Liga.

            </div>

        </div>

    </div>


    <!-- 2026 FORMATION SEASON -->

    <div class="formation">

        <h2>📜 2026 Formation Season</h2>

        <p>
            The 2026 season is the formation season for the league system.
            The 24 managers will begin in two randomized 12-team leagues.
        </p>

        <ul>

            <li>
                At the conclusion of the 2026 season, the
                <strong>top six teams from each league</strong> will form
                the California Primeira Liga.
            </li>

            <li>
                The <strong>bottom six teams from each league</strong>
                will form the Segunda Liga.
            </li>

            <li>
                Beginning in 2027, the promotion and relegation system
                will be used every season.
            </li>

        </ul>

    </div>

</div>
