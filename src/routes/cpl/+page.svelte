<script>
    import { cplLeagueName } from '$lib/utils/leagueInfo';
</script>

<svelte:head>
    <title>{cplLeagueName}</title>
</svelte:head>

<div class="league-page">
    <div class="league-header">
        <div class="league-badge">CPL</div>

        <div>
            <h1>{cplLeagueName}</h1>
            <p>California's Premier Fantasy Football Division</p>
        </div>
    </div>

    <div class="league-grid">
        <a href="/cpl/standings">
            <span>📊</span>
            <strong>Standings</strong>
            <small>View the current CPL table</small>
        </a>

        <a href="/cpl/matchups">
            <span>🏈</span>
            <strong>Matchups</strong>
            <small>Weekly scores and results</small>
        </a>

        <a href="/cpl/rosters">
            <span>👥</span>
            <strong>Rosters</strong>
            <small>View all CPL teams</small>
        </a>

        <a href="/cpl/transactions">
            <span>🔄</span>
            <strong>Transactions</strong>
            <small>Waivers and moves</small>
        </a>

        <a href="/cpl/champions">
            <span>🏆</span>
            <strong>Champions</strong>
            <small>CPL championship history</small>
        </a>

        <a href="/cpl/records">
            <span>📈</span>
            <strong>Records</strong>
            <small>CPL all-time records</small>
        </a>
    </div>

    <div class="promotion-box">
        <h2>⬇️ Relegation</h2>
        <p>
            The 11th and 12th place teams are automatically relegated.
            Two additional teams will be relegated through the CPL Toilet Bowl.
        </p>
        <a href="/promotion-relegation">View Promotion & Relegation →</a>
    </div>
</div>

<style>
    .league-page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .league-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .league-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #071a38;
        color: white;
        font-size: 1.4rem;
        font-weight: 800;
        border: 4px solid #bfc5cc;
    }

    h1 {
        margin: 0;
        font-size: 2rem;
    }

    .league-header p {
        margin: 0.3rem 0 0;
        opacity: 0.7;
    }

    .league-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    .league-grid a {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        padding: 1.5rem;
        border-radius: 12px;
        background: var(--surface-color, #f5f5f5);
        text-decoration: none;
        color: inherit;
        transition: transform 0.15s ease;
    }

    .league-grid a:hover {
        transform: translateY(-3px);
    }

    .league-grid span {
        font-size: 1.8rem;
    }

    .league-grid strong {
        font-size: 1.1rem;
    }

    .league-grid small {
        opacity: 0.65;
    }

    .promotion-box {
        margin-top: 2rem;
        padding: 1.5rem;
        border-radius: 12px;
        background: #071a38;
        color: white;
    }

    .promotion-box h2 {
        margin-top: 0;
    }

    .promotion-box a {
        color: white;
        font-weight: 700;
    }

    @media (max-width: 700px) {
        .league-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
