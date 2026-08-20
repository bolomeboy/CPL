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
    .toiletBowl p,
    .formation p {
        margin: 7px 0;
        line-height: 1.45;
        font-size: 0.92em;
    }

    .promotionList {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-top: 15px;
    }

    .promotionSpot,
    .relegationSpot,
    .matchup {
        background-color: var(--ebebeb);
        border: 1px solid var(--ddd);
        padding: 11px 8px;
        text-align: center;
        font-size: 0.9em;
        font-weight: 600;
    }

    .arrow {
        text-align: center;
        font-size: 25px;
        margin: 15px 0;
    }

    .relegationList {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        margin-top: 15px;
    }

    .toiletBowl {
        margin-top: 15px;
    }

    .bracket {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 15px;
    }

    .matchupBox {
        background-color: var(--ebebeb);
        border: 1px solid var(--ddd);
        padding: 14px;
    }

    .matchupBox h3 {
        margin: 0 0 8px;
        text-align: center;
        font-size: 1em;
    }

    .matchup {
        margin: 5px 0;
        font-weight: 500;
    }

    .formation {
        margin-top: 28px;
    }

    .formation h2 {
        text-align: left;
    }

    .note {
        margin-top: 12px;
        padding: 10px 12px;
        border-left: 3px solid var(--blueOne);
        background-color: var(--ebebeb);
        font-size: 0.88em;
    }

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

    <div class="header">
        <h1>Promotion & Relegation</h1>
        <p>
            The system connecting the California Primeira Liga and Segunda Liga
        </p>
    </div>

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

    <div class="arrow">
        ⬆️ &nbsp; ⬇️
    </div>

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

        <div class="toiletBowl">

            <h2>🚽 CPL Toilet Bowl</h2>

            <p>
                Teams finishing 7th–10th enter the Toilet Bowl to determine
                the final two relegated teams.
            </p>

            <div class="bracket">

                <div class="matchupBox">

                    <h3>Week 1</h3>

                    <div class="matchup">
                        7th vs 8th
                    </div>

                    <div class="matchup">
                        9th vs 10th
                    </div>

                </div>

                <div class="matchupBox">

                    <h3>Final Relegation Round</h3>

                    <div class="matchup">
                        Winner of 9/10 vs Loser of 7/8
                    </div>

                    <div class="matchup">
                        Loser is relegated
                    </div>

                </div>

            </div>

            <div class="note">
                <strong>Toilet Bowl:</strong>
                The winner of 7th vs. 8th stays in the CPL. The loser of
                9th vs. 10th is relegated. The winner of 9th vs. 10th then
                plays the loser of 7th vs. 8th. The winner stays in the CPL
                and the loser is relegated.
            </div>

        </div>

    </div>

    <div class="formation">

        <h2>📜 2026 Formation Season</h2>

        <p>
            The 2026 season is the formation season for the league system.
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
