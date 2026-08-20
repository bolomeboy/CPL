<script>
    // Promotion and relegation rules
    const promotionSpots = 4;
    const automaticRelegationSpots = 2;
    const toiletBowlSpots = 2;
</script>

<svelte:head>
    <title>Promotion & Relegation</title>
</svelte:head>

<style>
    #page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px 25px;
    }

    .header {
        text-align: center;
        margin-bottom: 40px;
    }

    .header h1 {
        margin: 0;
        font-size: 2.3em;
    }

    .header p {
        margin-top: 10px;
        color: #888;
        font-size: 1.05em;
    }

    .division {
        margin-bottom: 40px;
    }

    .divisionHeader {
        background-color: var(--blueOne);
        color: white;
        padding: 12px 18px;
        font-size: 1.4em;
        font-weight: 600;
        text-align: center;
    }

    .divisionSubheader {
        text-align: center;
        color: #888;
        margin: 10px 0 20px;
    }

    .rulesGrid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }

    .ruleCard {
        background-color: var(--f3f3f3);
        border: 1px solid var(--ddd);
        padding: 20px;
        text-align: center;
    }

    .ruleIcon {
        font-size: 32px;
        margin-bottom: 10px;
    }

    .ruleCard h3 {
        margin: 5px 0 10px;
    }

    .ruleCard p {
        margin: 0;
        color: #777;
        line-height: 1.5;
    }

    .promotionBox {
        border: 2px solid #4d8c5a;
        background-color: #f3f8f4;
        padding: 25px;
        margin-top: 20px;
        text-align: center;
    }

    .promotionBox h2 {
        margin-top: 0;
    }

    .promotionList {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-top: 20px;
    }

    .promotionSpot {
        background-color: white;
        border: 1px solid #ccc;
        padding: 15px;
        font-weight: 600;
    }

    .relegationBox {
        border: 2px solid #b54b4b;
        background-color: #faf3f3;
        padding: 25px;
        margin-top: 20px;
        text-align: center;
    }

    .relegationBox h2 {
        margin-top: 0;
    }

    .relegationList {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-top: 20px;
    }

    .relegationSpot {
        background-color: white;
        border: 1px solid #ccc;
        padding: 15px;
        font-weight: 600;
    }

    .toiletBowl {
        margin-top: 30px;
        padding: 25px;
        background-color: var(--f3f3f3);
        border: 1px solid var(--ddd);
    }

    .toiletBowl h2 {
        text-align: center;
        margin-top: 0;
    }

    .toiletBowl p {
        text-align: center;
        color: #777;
    }

    .bracket {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-top: 25px;
    }

    .matchup {
        border: 1px solid var(--ddd);
        background-color: white;
        padding: 20px;
        text-align: center;
    }

    .matchup h3 {
        margin-top: 0;
    }

    .matchup div {
        padding: 10px;
        margin: 5px 0;
        background-color: var(--f3f3f3);
    }

    .arrow {
        text-align: center;
        font-size: 32px;
        margin: 25px 0;
    }

    .formation {
        margin-top: 50px;
        padding: 25px;
        background-color: var(--f3f3f3);
        border: 1px solid var(--ddd);
    }

    .formation h2 {
        text-align: center;
        margin-top: 0;
    }

    .formation p {
        line-height: 1.6;
    }

    @media (max-width: 700px) {
        #page {
            padding: 25px 15px;
        }

        .rulesGrid {
            grid-template-columns: 1fr;
        }

        .promotionList {
            grid-template-columns: repeat(2, 1fr);
        }

        .relegationList {
            grid-template-columns: 1fr;
        }

        .bracket {
            grid-template-columns: 1fr;
        }

        .header h1 {
            font-size: 1.8em;
        }
    }
</style>

<div id="page">

    <div class="header">
        <h1>Promotion & Relegation</h1>
        <p>
            The system connecting the California Primeira Liga and Segunda Liga
        </p>
    </div>


    <!-- SEGUNDA PROMOTION -->

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
                semifinals will be promoted to the CPL for the following season.
            </p>

            <div class="promotionList">

                <div class="promotionSpot">
                    🥇 Semifinalist
                </div>

                <div class="promotionSpot">
                    🥈 Semifinalist
                </div>

                <div class="promotionSpot">
                    ⚽ Semifinalist
                </div>

                <div class="promotionSpot">
                    ⚽ Semifinalist
                </div>

            </div>

        </div>

    </div>


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

            <p>
                Teams finishing 7th–10th enter the Toilet Bowl to determine
                the final two relegated teams.
            </p>

            <div class="bracket">

                <div class="matchup">

                    <h3>Week 1</h3>

                    <div>
                        7th vs 8th
                    </div>

                    <div>
                        9th vs 10th
                    </div>

                </div>


                <div class="matchup">

                    <h3>Final Relegation Round</h3>

                    <div>
                        Winner of 9/10 vs Loser of 7/8
                    </div>

                    <div>
                        Final relegation spot
                    </div>

                </div>

            </div>

            <p style="margin-top: 20px;">
                The two teams that lose the Toilet Bowl process are relegated
                to the Segunda Liga.
            </p>

        </div>

    </div>


    <!-- 2026 FORMATION -->

    <div class="formation">

        <h2>📜 2026 Formation Season</h2>

        <p>
            The 2026 season is the formation season for the CPL and Segunda Liga.
            The 24 managers will begin in two randomized 12-team leagues.
        </p>

        <p>
            At the conclusion of the 2026 season, the <strong>top six teams
            from each league</strong> will form the California Primeira Liga.
            The <strong>bottom six teams from each league</strong> will form
            the Segunda Liga.
        </p>

        <p>
            Beginning in 2027, the promotion and relegation system will be
            used every season.
        </p>

    </div>

</div>
