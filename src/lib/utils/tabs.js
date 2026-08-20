import { leagueID } from '$lib/utils/leagueInfo';

export const tabs = [
    {
        icon: 'home',
        label: 'Home',
        dest: '/',
        key: 'home',
    },

    {
        icon: 'emoji_events',
        label: 'California Primeira Liga',
        nest: true,
        key: 'cpl',
        children: [
            {
                icon: 'leaderboard',
                label: 'Standings',
                dest: '/cpl/standings',
            },
            {
                icon: 'sports',
                label: 'Matchups',
                dest: '/cpl/matchups',
            },
            {
                icon: 'storage',
                label: 'Rosters',
                dest: '/cpl/rosters',
            },
            {
                icon: 'swap_horiz',
                label: 'Transactions',
                dest: '/cpl/transactions',
            },
            {
                icon: 'emoji_events',
                label: 'Champions',
                dest: '/cpl/champions',
            },
            {
                icon: 'military_tech',
                label: 'Records',
                dest: '/cpl/records',
            },
        ],
    },

    {
        icon: 'emoji_events',
        label: 'Segunda Liga',
        nest: true,
        key: 'segunda',
        children: [
            {
                icon: 'leaderboard',
                label: 'Standings',
                dest: '/segunda/standings',
            },
            {
                icon: 'sports',
                label: 'Matchups',
                dest: '/segunda/matchups',
            },
            {
                icon: 'storage',
                label: 'Rosters',
                dest: '/segunda/rosters',
            },
            {
                icon: 'swap_horiz',
                label: 'Transactions',
                dest: '/segunda/transactions',
            },
            {
                icon: 'emoji_events',
                label: 'Champions',
                dest: '/segunda/champions',
            },
            {
                icon: 'military_tech',
                label: 'Records',
                dest: '/segunda/records',
            },
        ],
    },

    {
        icon: 'sync_alt',
        label: 'Promotion & Relegation',
        dest: '/promotion-relegation',
        key: 'promotion',
    },

    {
        icon: 'history',
        label: 'League History',
        nest: true,
        key: 'history',
        children: [
            {
                icon: 'emoji_events',
                label: 'Champions',
                dest: '/history/champions',
            },
            {
                icon: 'leaderboard',
                label: 'All-Time Records',
                dest: '/history/records',
            },
            {
                icon: 'history_edu',
                label: 'Season History',
                dest: '/history/seasons',
            },
        ],
    },

    {
        icon: 'menu_book',
        label: 'League Rules',
        dest: '/rules',
        key: 'rules',
    },

    {
        icon: 'sports_football',
        label: 'Go to Sleeper',
        dest: `https://sleeper.app/leagues/${leagueID}`,
        key: 'sleeper',
    },
];
