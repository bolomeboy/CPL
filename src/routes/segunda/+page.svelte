<script>
    import { segundaLeagueName } from '$lib/utils/leagueInfo';
</script>

<svelte:head>
    <title>{segundaLeagueName}</title>
</svelte:head>

<style>
    #league {
        max-width: 1000px;
        margin: 0 auto;
        padding: 30px 20px;
    }

    .header {
        text-align: center;
        margin-bottom: 28px;
    }

    .badge {
        width: 85px;
        height: 85px;
        margin: 0 auto 12px;
        border-radius: 50%;
        background-color: var(--blueOne);
        border: 3px solid #c5c5c5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 23px;
        font-weight: bold;
    }

    h1 {
        margin: 0;
        font-size: 1.9em;
    }

    .subtitle {
        margin-top: 6px;
        color: #888;
        font-size: 0.9em;
    }

    .sectionTitle {
        background-color: var(--blueOne);
        color: #fff;
        padding: 9px 15px;
        font-size: 1.15em;
        font-weight: 600;
        margin-bottom: 12px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .card {
        background-color: var(--f3f3f3);
        border: 1px solid var(--ddd);
        padding: 17px 12px;
        text-align: center;
        text-decoration: none;
        color: inherit;
        transition: transform 0.15s ease;
    }

    .card:hover {
        transform: translateY(-2px);
    }

    .icon {
        font-size: 24px;
        margin-bottom: 5px;
    }

    .card h3 {
        margin: 4px 0;
        font-size: 1em;
    }

    .card p {
        margin: 4px 0 0;
        color: #888;
        font-size: 0.82em;
    }

    .promotion {
        margin-top: 25px;
        border: 1px solid var(--ddd);
        padding: 16px;
        background-color: var(--f3f3f3);
    }

    .promotion h2 {
        margin: 0 0 7px;
        font-size: 1.2em;
    }

    .promotion p {
        margin: 5px 0 10px;
        font-size: 0.9em;
        line-height: 1.45;
    }

    .promotion a {
        color: var(--blueOne);
        font-weight: bold;
        font-size: 0.9em;
        text-decoration: none;
    }

    .promotion a:hover {
        text-decoration: underline;
    }

    @media (max-width: 700px) {
        #league {
            padding: 22px 14px;
        }

        .grid {
            grid-template-columns: repeat(2, 1fr);
        }

        h1 {
            font-size: 1.65em;
        }
    }

    @media (max-width: 450px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>

<div id="league">

    <div class="header">

        <div class="badge">
            SL
        </div>

        <h1>{segundaLeagueName}</h1>

        <div class="subtitle">
            Second Division • 12 Teams
        </div>

    </div>


    <div class="sectionTitle">
        Segunda Liga
    </div>

    <div class="grid">

        <a class="card" href="/segunda/standings">
            <div class="icon">🏆</div>
            <h3>Standings</h3>
            <p>Current Segunda standings</p>
        </a>

        <a class="card" href="/segunda/matchups">
            <div class="icon">🏈</div>
            <h3>Matchups</h3>
            <p>Weekly scores and results</p>
        </a>

        <a class="card" href="/segunda/rosters">
            <div class="icon">👥</div>
            <h3>Rosters</h3>
            <p>Segunda team rosters</p>
        </a>

        <a class="card" href="/segunda/transactions">
            <div class="icon">🔄</div>
            <h3>Transactions</h3>
            <p>Waivers and transactions</p>
        </a>

        <a class="card" href="/segunda/champions">
            <div class="icon">🥇</div>
            <h3>Champions</h3>
            <p>Segunda championship history</p>
        </a>

        <a class="card" href="/segunda/records">
            <div class="icon">📊</div>
            <h3>Records</h3>
            <p>Segunda all-time records</p>
        </a>

    </div>


    <div class="promotion">

        <h2>⬆️ Promotion</h2>

        <p>
            The top four teams from the Segunda Liga playoffs will be
            promoted to the California Primeira Liga for the following season.
        </p>

        <a href="/promotion-relegation">
            View Promotion & Relegation →
        </a>

    </div>

</div>
