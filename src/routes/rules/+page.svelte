<svelte:head>
    <title>League Rules</title>
</svelte:head>

<style>
    #page {
        max-width: 1000px;
        margin: 0 auto;
        padding: 30px 20px;
    }

    .header {
        text-align: center;
        margin-bottom: 30px;
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

    .section {
        margin-bottom: 28px;
    }

    .sectionTitle {
        background-color: var(--blueOne);
        color: #fff;
        padding: 9px 15px;
        font-size: 1.15em;
        font-weight: 600;
    }

    .content {
        border: 1px solid var(--ddd);
        border-top: none;
        background-color: var(--f3f3f3);
        padding: 18px;
    }

    .content p {
        margin: 6px 0 12px;
        font-size: 0.92em;
        line-height: 1.5;
    }

    .content h3 {
        margin: 18px 0 7px;
        font-size: 1em;
    }

    .content h3:first-child {
        margin-top: 0;
    }

    ul,
    ol {
        margin: 6px 0 12px;
        padding-left: 23px;
    }

    li {
        margin-bottom: 7px;
        line-height: 1.45;
        font-size: 0.92em;
    }

    .settings {
        line-height: 1.65;
        font-size: 0.92em;
    }

    .settings strong {
        font-weight: 600;
    }

    .divider {
        border: none;
        border-top: 1px solid var(--ddd);
        margin: 18px 0;
    }

    .playoffSection {
        margin-bottom: 18px;
    }

    .playoffSection:last-child {
        margin-bottom: 0;
    }

    .playoffSection h3 {
        margin-bottom: 6px;
    }

    .note {
        margin-top: 12px;
        padding: 11px 13px;
        background-color: var(--ebebeb);
        border-left: 3px solid var(--blueOne);
        font-size: 0.88em;
        line-height: 1.5;
    }

    .payoutTable {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
        font-size: 0.92em;
    }

    .payoutTable th,
    .payoutTable td {
        padding: 9px 10px;
        border-bottom: 1px solid var(--ddd);
        text-align: left;
    }

    .payoutTable th {
        font-weight: 600;
        background-color: var(--ebebeb);
    }

    .payoutTable td:last-child,
    .payoutTable th:last-child {
        text-align: right;
    }

    .payoutTable tr:last-child td {
        border-bottom: none;
    }

    .divisionTitle {
        font-weight: 600;
        margin-top: 16px;
        margin-bottom: 6px;
    }

    .formationList {
        margin-top: 8px;
    }

    @media (max-width: 700px) {
        #page {
            padding: 22px 14px;
        }

        .header h1 {
            font-size: 1.65em;
        }

        .content {
            padding: 15px;
        }

        .payoutTable {
            font-size: 0.88em;
        }
    }

    @media (max-width: 450px) {
        .payoutTable th,
        .payoutTable td {
            padding: 8px 7px;
        }
    }
</style>


<div id="page">

    <!-- HEADER -->

    <div class="header">

        <h1>League Rules</h1>

        <p>
            California Primeira Liga & Segunda Liga
        </p>

    </div>


    <!-- ROSTER & SCORING -->

    <div class="section">

        <div class="sectionTitle">
            🏈 Roster & Scoring
        </div>

        <div class="content">

            <p class="settings">
                <strong>Lineup:</strong>
                1 QB • 2 RB • 2 WR • 1 TE • 2 FLEX (RB/WR/TE)
            </p>

            <p class="settings">
                <strong>Roster:</strong>
                7 Bench • 1 IR
            </p>

            <p class="settings">
                <strong>Scoring:</strong>
                Full PPR • 6 points per passing TD
            </p>

            <p class="settings">
                <strong>Waivers:</strong>
                $100 FAAB
            </p>

            <p class="settings">
                <strong>League Median:</strong>
                Applied every week
            </p>

            <p class="settings">
                <strong>League Type:</strong>
                Redraft
            </p>

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

            <div class="playoffSection">

                <h3>California Primeira Liga</h3>

                <ul>
                    <li>6 teams qualify for the playoffs.</li>
                    <li>Seeds 1 and 2 receive a first-round bye.</li>
                    <li>Playoff matchups are reseeded each round.</li>
                </ul>

            </div>

            <hr class="divider">

            <div class="playoffSection">

                <h3>Segunda Liga</h3>

                <ul>
                    <li>6 teams qualify for the playoffs.</li>
                    <li>Seeds 1 and 2 receive a first-round bye.</li>
                    <li>Playoff matchups are reseeded each round.</li>
                </ul>

            </div>

        </div>

    </div>


    <!-- PROMOTION & RELEGATION -->

    <div class="section">

        <div class="sectionTitle">
            🔄 Promotion & Relegation
        </div>

        <div class="content">

            <h3>Segunda Liga → CPL</h3>

            <ul>
                <li>
                    The four teams that reach the Segunda Liga playoff
                    semifinals are promoted to the CPL for the following season.
                </li>
            </ul>


            <h3>CPL → Segunda Liga</h3>

            <ul>
                <li>11th place is automatically relegated.</li>
                <li>12th place is automatically relegated.</li>
                <li>Teams finishing 7th–10th enter the CPL Toilet Bowl.</li>
                <li>
                    Two additional teams are relegated through the
                    Toilet Bowl, creating four total relegations.
                </li>
            </ul>


            <div class="note">

                <strong>Important:</strong>

                Promotion is determined by playoff success in the
                Segunda Liga, while CPL relegation is determined by
                regular-season placement and the Toilet Bowl.

            </div>

        </div>

    </div>


    <!-- TOILET BOWL -->

    <div class="section">

        <div class="sectionTitle">
            🚽 CPL Toilet Bowl
        </div>

        <div class="content">

            <p>
                Teams finishing <strong>7th–10th</strong> enter the
                Toilet Bowl to determine the two additional relegation spots.
            </p>

            <ol>

                <li>
                    <strong>7th vs. 8th:</strong>
                    The winner stays in the CPL. The loser gets another
                    chance to avoid relegation.
                </li>

                <li>
                    <strong>9th vs. 10th:</strong>
                    The loser is relegated to the Segunda Liga.
                    The winner advances to the Relegation Round.
                </li>

                <li>
                    <strong>Relegation Round:</strong>
                    The loser of 7th vs. 8th plays the winner of
                    9th vs. 10th.
                </li>

                <li>
                    The winner of the Relegation Round stays in the CPL.
                    The loser is relegated to the Segunda Liga.
                </li>

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

            <p>
                The 2026 season is the formation season for the league
                system. The 24 managers will begin in two randomized
                12-team leagues.
            </p>

            <ul class="formationList">

                <li>
                    The top six teams from each league will form the
                    <strong>California Primeira Liga</strong>.
                </li>

                <li>
                    The bottom six teams from each league will form the
                    <strong>Segunda Liga</strong>.
                </li>

                <li>
                    Beginning in 2027, the promotion and relegation system
                    will be used every season.
                </li>

            </ul>

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


            <h3>CPL</h3>

            <table class="payoutTable">

                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Payout</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>🥇 1st</td>
                        <td>$500</td>
                    </tr>

                    <tr>
                        <td>🥈 2nd</td>
                        <td>$120</td>
                    </tr>

                    <tr>
                        <td>🥉 3rd</td>
                        <td>$100</td>
                    </tr>
                </tbody>

            </table>


            <h3>Segunda Liga</h3>

            <table class="payoutTable">

                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Payout</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>🥇 1st</td>
                        <td>$300</td>
                    </tr>

                    <tr>
                        <td>🥈 2nd</td>
                        <td>$100</td>
                    </tr>

                    <tr>
                        <td>🥉 3rd</td>
                        <td>$50</td>
                    </tr>

                    <tr>
                        <td>4th</td>
                        <td>$30</td>
                    </tr>
                </tbody>

            </table>


            <div class="note">

                <strong>CPL Incentive:</strong>

                $10 from each Segunda Liga buy-in is added to the
                CPL championship pot to provide an additional incentive
                for competing in the top division.

            </div>

        </div>

    </div>

</div>
