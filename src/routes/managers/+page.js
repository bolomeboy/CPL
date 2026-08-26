import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

const FLIPCUP_ID = '1314475281792118784';

export async function load() {

    const redResponse = await fetch(
        `https://api.sleeper.app/v1/league/${cplLeagueID}/users`
    );

    const greenResponse = await fetch(
        `https://api.sleeper.app/v1/league/${segundaLeagueID}/users`
    );

    if (!redResponse.ok) {
        throw new Error(
            `Could not load CPL Red managers: ${redResponse.status}`
        );
    }

    if (!greenResponse.ok) {
        throw new Error(
            `Could not load CPL Green managers: ${greenResponse.status}`
        );
    }

    const redUsers = await redResponse.json();
    const greenUsers = await greenResponse.json();

    const managers = [
        ...redUsers.map(user => ({
            ...user,
            division: 'red'
        })),

        ...greenUsers.map(user => ({
            ...user,
            division: 'green'
        }))
    ];

    if (!managers.some(
        manager =>
            String(manager.user_id) === FLIPCUP_ID
    )) {
        managers.push({
            user_id: FLIPCUP_ID,
            display_name: 'flipcup1',
            user_name: 'flipcup1',
            is_bot: false,
            division: 'green',
            metadata: {},
            avatar: null
        });
    }

    return {
        managers
    };
}
