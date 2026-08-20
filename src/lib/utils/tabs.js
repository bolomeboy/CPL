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
        label: 'CPL',
        dest: '/cpl',
        key: 'cpl',
    },

    {
        icon: 'emoji_events',
        label: 'Segunda',
        dest: '/segunda',
        key: 'segunda',
    },

    {
        icon: 'menu_book',
        label: 'League Info',
        nest: true,
        key: 'league_info',
        children: [
            {
                icon: 'sync_alt',
                label: 'Promotion & Relegation',
                dest: '/promotion-relegation',
            },
            {
                icon: 'menu_book',
                label: 'League Rules',
                dest: '/rules',
            },
        ],
    },

    {
        icon: 'more_horiz',
        label: 'More',
        nest: true,
        key: 'more',
        children: [
            {
                icon: 'sports_football',
                label: 'Go to Sleeper',
                dest: `https://sleeper.app/leagues/${leagueID}`,
            },
        ],
    },
];
