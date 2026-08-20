<svelte:head>
    <title>League Rules</title>
</svelte>

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
    }

    .section {
        margin-bottom: 35px;
    }

    .sectionTitle {
        background-color: var(--blueOne);
        color: white;
        padding: 12px 18px;
        font-size: 1.35em;
        font-weight: 600;
    }

    .content {
        border: 1px solid var(--ddd);
        border-top: none;
        background-color: var(--f3f3f3);
        padding: 20px;
    }

    .settingsGrid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }

    .setting {
        background-color: white;
        border: 1px solid var(--ddd);
        padding: 15px;
    }

    .setting strong {
        display: block;
        margin-bottom: 5px;
    }

    .setting span {
        color: #777;
    }

    ul {
        margin: 5px 0 0;
        padding-left: 25px;
    }

    li {
        margin-bottom: 8px;
        line-height: 1.5;
    }

    .playoffGrid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .division {
        background-color: white;
        border: 1px solid var(--ddd);
        padding: 20px;
    }

    .division h3 {
        margin-top: 0;
        text-align: center;
    }

    .payoutGrid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .payout {
        background-color: white;
        border: 1px solid var(--ddd);
        padding: 20px;
    }

    .payout h3 {
        margin-top: 0;
        text-align: center;
    }

    .money {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        padding: 10px 0;
    }

    .money:last-child {
        border-bottom: none;
    }

    .formation {
        background-color: white;
        border: 1px solid var(--ddd);
        padding: 20px;
        line-height: 1.6;
    }

    .note {
        margin-top: 15px;
        padding: 15px;
        background-color: #f5f5f5;
        border-left: 4px solid var(--blueOne);
    }

    @media (max-width: 700px) {
        #page {
            padding: 25px 15px;
        }

        .settingsGrid {
            grid-template-columns: 1fr 1fr;
        }

        .playoffGrid,
        .payoutGrid {
            grid-template-columns: 1fr;
        }

        .header h1 {
            font-size: 1.8em;
        }
    }

    @media (max-width: 450px) {
        .settingsGrid {
            grid-template-columns: 1fr;
        }
    }
</style>

<div id="page">

    <div class="header">
        <h1>League Rules</h1>
        <p>California Primeira Liga & Segunda Liga</p>
    </div>


    <!-- ROSTER & SCORING -->

    <div class="section">

        <div class="sectionTitle">
            🏈 Roster & Scoring Settings
        </div>

        <div class="content">

            <div class="settingsGrid">

                <div class="setting">
                    <strong>Quarterback</strong>
                    <span>1 QB</span>
                </div>

                <div class="setting">
                    <strong>Running Back</strong>
                    <span>2 RB</span>
                </div>

                <div class="setting">
                    <strong>Wide Receiver</strong>
                    <span>2 WR</span>
                </div>

                <div class="setting">
                    <strong>Tight End</strong>
                    <span>1 TE</span>
                </div>

                <div class="setting">
                    <strong>Flex</strong>
                    <span>2 FLEX (RB/WR/TE)</span>
                </div>

                <div class="setting">
                    <strong>Bench</strong>
                    <span>7 players</span>
                </div>

                <div class="setting">
                    <strong>IR</strong>
                    <span>1 spot</span>
                </div>

                <div class="setting">
                    <strong>Scoring</strong>
                    <span>Full PPR</span>
                </div>

                <div class="setting">
                    <strong>Passing TD</strong>
                    <span>6 points</span>
                </div>

                <div class="setting">
                    <strong>Waivers</strong>
                    <span>$100 FAAB</span>
                </div>

                <div class="setting">
                    <strong>League Median</strong>
                    <span>Applied every week</span>
                </div>

                <div class="setting">
                    <strong>League Type</strong>
                    <span>Redraft</span>
                </div>

            </div>

            <div class="note">
                <strong>IR Eligibility:</strong>
                Players listed as IR, PUP, Out, or Doubtful are eligible
                to be placed in the IR slot.
            </div>

            <div class="note">
                <strong>Weekly Scoring:</strong>
                Each team plays a head-to-head matchup while also being
                compared against the weekly league median.
            </div>

        </div>

    </div>


    <!-- PLAYOFFS -->

    <div class="section">

        <div class="sectionTitle">
            🏆 Playoff Rules
        </div>

        <div class="content">

            <div class="playoffGrid">

                <div class="division">
                    <h3>California Primeira Liga</h3>

                    <ul>
                        <li>6 teams qualify for the playoffs.</li>
                        <li>Seeds 1 and 2 receive a first-round bye.</li>
                        <li>Playoff matchups are reseeded each round.</li>
                    </ul>
                </div>

                <div class="division">
                    <h3>Segunda Liga</h3>

                    <ul>
                        <li>6 teams qualify for the playoffs.</li>
                        <li>Seeds 1 and 2 receive a first-round bye.</li>
                        <li>Playoff matchups are reseeded each round.</li>
                    </ul>
                </div>

            </div>

        </div>

    </div>


    <!-- PROMOTION / RELEGATION -->

    <div class="section">

        <div class="sectionTitle">
            🔄 Promotion & Relegation
        </div>

        <div class="content">

            <h3>Segunda → CPL</h3>

            <ul>
                <li>
                    The four teams that reach the Segunda Liga playoff
                    semifinals are promoted to the CPL.
                </li>
            </ul>

            <h3>CPL → Segunda</h3>

            <ul>
                <li>11th place is automatically relegated.</li>
                <li>12th place is automatically relegated.</li>
                <li>Teams finishing 7th–10th enter the CPL Toilet Bowl.</li>
                <li>
                    Two teams from the Toilet Bowl are relegated,
                    creating four total relegations.
                </li>
            </ul>

            <div class="note">
                <strong>Important:</strong>
                Promotion is determined by playoff success in Segunda,
                while CPL relegation is determined by regular-season
                placement and the Toilet Bowl.
            </div>

        </div>

    </div>


    <!-- TOILET BOWL -->

    <div class="section">

        <div class="sectionTitle">
            🚽 CPL Toilet Bowl
        </div>

        <div class="content">

            <ol>
                <li>7th place plays 8th place.</li>
                <li>9th place plays 10th place.</li>
                <li>The winner of 7th vs. 8th remains in the CPL.</li>
                <li>The loser of 9th vs. 10th is relegated.</li>
                <li>
                    The winner of 9th vs. 10th plays the loser
                    of 7th vs. 8th.
                </li>
                <li>The winner of that game remains in the CPL.</li>
                <li>The loser is relegated.</li>
            </ol>

            <div class="note">
                <strong>Result:</strong>
                Four CPL teams are relegated each season:
                11th place, 12th place, and the two Toilet Bowl losers.
            </div>

        </div>

    </div>


    <!-- 2026 FORMATION -->

    <div class="section">

        <div class="sectionTitle">
            📜 2026 Formation Season
        </div>

        <div class="content">

            <div class="formation">

                <p>
                    The 2026 season is the formation season for the league
                    system. The 24 managers will begin in two randomized
                    12-team leagues.
                </p>

                <p>
                    At the conclusion of the 2026 season, the top six teams
                    from each league will form the California Primeira Liga.
                </p>

                <p>
                    The bottom six teams from each league will form the
                    Segunda Liga.
                </p>

                <p>
                    Beginning in 2027, the promotion and relegation system
                    will be used every season.
                </p>

            </div>

        </div>

    </div>


    <!-- BUY-IN & PAYOUTS -->

    <div class="section">

        <div class="sectionTitle">
            💰 Buy-In & Payouts
        </div>

        <div class="content">

            <p>
                <strong>Buy-In:</strong> $50 per team
            </p>

            <div class="payoutGrid">

                <div class="payout">

                    <h3>🥇 CPL</h3>

                    <div class="money">
                        <strong>1st</strong>
                        <span>$500</span>
                    </div>

                    <div class="money">
                        <strong>2nd</strong>
                        <span>$120</span>
                    </div>

                    <div class="money">
                        <strong>3rd</strong>
                        <span>$100</span>
                    </div>

                </div>


                <div class="payout">

                    <h3>🥈 Segunda Liga</h3>

                    <div class="money">
                        <strong>1st</strong>
                        <span>$300</span>
                    </div>

                    <div class="money">
                        <strong>2nd</strong>
                        <span>$100</span>
                    </div>

                    <div class="money">
                        <strong>3rd</strong>
                        <span>$50</span>
                    </div>

                    <div class="money">
                        <strong>4th</strong>
                        <span>$30</span>
                    </div>

                </div>

            </div>

            <div class="note">
                <strong>CPL Incentive:</strong>
                $10 from each Segunda Liga buy-in is added to the
                CPL championship pot to provide an additional incentive
                for competing in the top division.
            </div>

        </div>

    </div>

</div>
