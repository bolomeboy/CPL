<script>
    import { cplLeagueName } from '$lib/utils/leagueInfo';
</script>

<svelte:head>
    <title>{cplLeagueName}</title>
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

    .divisionLogo {
    width: 125px;
    height: 125px;
    object-fit: contain;
    margin: 0 auto 12px;
    display: block;
    filter:
        drop-shadow(0 2px 2px rgba(0, 0, 0, 0.85))
        drop-shadow(0 4px 5px rgba(0, 0, 0, 0.65))
        drop-shadow(0 7px 10px rgba(0, 0, 0, 0.45));
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

    .relegation {
        margin-top: 25px;
        border: 1px solid var(--ddd);
        padding: 16px;
        background-color: var(--f3f3f3);
    }

    .relegation h2 {
        margin: 0 0 7px;
        font-size: 1.2em;
    }

    .relegation p {
        margin: 5px 0 10px;
        font-size: 0.9em;
        line-height: 1.45;
    }

    .relegation a {
        color: var(--blueOne);
        font-weight: bold;
        font-size: 0.9em;
        text-decoration: none;
    }

    .relegation a:hover {
        text-decoration: underline;
    }

    @media (max-width: 700px) {
        #league {
            padding: 22px 14px;
        }

        .divisionLogo {
            width: 110px;
            height: 110px;
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

        <img
            src="/cpl-logo.png"
            alt="California Primeira Liga"
            class="divisionLogo"
        />

        <h1>{cplLeagueName}</h1>

        <div class="subtitle">
            Upper Division • 12 Teams
        </div>

    </div>


    <div class="sectionTitle">
        California Primeira Liga
    </div>

    <div class="grid">

        <a class="card" href="/cpl/standings">
            <div class="icon">🏆</div>
            <h3>Standings</h3>
            <p>Current CPL standings</p>
        </a>

        <a class="card" href="/cpl/matchups">
            <div class="icon">🏈</div>
            <h3>Matchups</h3>
            <p>Weekly scores and results</p>
        </a>

        <a class="card" href="/cpl/rosters">
            <div class="icon">👥</div>
            <h3>Rosters</h3>
            <p>CPL team rosters</p>
        </a>

        <a class="card" href="/cpl/transactions">
            <div class="icon">🔄</div>
            <h3>Transactions</h3>
            <p>Waivers and transactions</p>
        </a>

        <a class="card" href="/cpl/champions">
            <div class="icon">🥇</div>
            <h3>Champions</h3>
            <p>CPL championship history</p>
        </a>

        <a class="card" href="/cpl/records">
            <div class="icon">📊</div>
            <h3>Records</h3>
            <p>CPL all-time records</p>
        </a>

    </div>


    <div class="relegation">

        <h2>⬇️ Relegation</h2>

        <p>
            The 11th and 12th place teams are automatically relegated.
            Two additional teams are relegated through the CPL Toilet Bowl.
        </p>

        <a href="/promotion-relegation">
            View Promotion & Relegation →
        </a>

    </div>

</div>
