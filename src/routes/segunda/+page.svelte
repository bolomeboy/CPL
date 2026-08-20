<script>
    import { segundaLeagueName } from '$lib/utils/leagueInfo';
</script>

<svelte:head>
    <title>{segundaLeagueName}</title>
</svelte>

<style>
    #league {
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px 25px;
    }

    .header {
        text-align: center;
        margin-bottom: 35px;
    }

    .badge {
        width: 110px;
        height: 110px;
        margin: 0 auto 15px;
        border-radius: 50%;
        background: var(--blueOne);
        border: 4px solid #c5c5c5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 28px;
        font-weight: bold;
    }

    h1 {
        margin: 0;
        font-size: 2.2em;
    }

    .subtitle {
        margin-top: 8px;
        color: #888;
    }

    .sectionTitle {
        background-color: var(--blueOne);
        color: white;
        padding: 10px 15px;
        font-size: 1.3em;
        font-weight: 500;
        margin-bottom: 15px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }

    .card {
        background: var(--f3f3f3);
        border: 1px solid var(--ddd);
        padding: 25px 20px;
        text-align: center;
        text-decoration: none;
        color: inherit;
        transition: transform 0.15s ease;
    }

    .card:hover {
        transform: translateY(-3px);
    }

    .icon {
        font-size: 28px;
        margin-bottom: 8px;
    }

    .card h3 {
        margin: 5px 0;
    }

    .card p {
        margin: 5px 0;
        color: #888;
        font-size: 0.9em;
    }

    .promotion {
        margin-top: 35px;
        border: 1px solid var(--ddd);
        padding: 20px;
        background-color: var(--f3f3f3);
    }

    .promotion h2 {
        margin-top: 0;
    }

    .promotion a {
        color: var(--blueOne);
        font-weight: bold;
    }

    @media (max-width: 700px) {
        .grid {
            grid-template-columns: 1fr;
        }

        #league {
            padding: 25px 15px;
        }

        h1 {
            font-size: 1.8em;
        }
    }
</style>

<div id="league">

    <div class="header">
        <div class="badge">
            2ª
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
            The four teams that reach the Segunda Liga playoff
            semifinals will be promoted to the CPL.
        </p>

        <a href="/promotion-relegation">
            View Promotion & Relegation →
        </a>
    </div>

</div>
