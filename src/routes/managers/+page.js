import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

export async function load() {

    const redPromise = fetch(
        `https://api.sleeper.app/v1/league/${cplLeagueID}/users`
    );

    const greenPromise = fetch(
        `https://api.sleeper.app/v1/league/${segundaLeagueID}/users`
    );

    const [redResponse, greenResponse] = await Promise.all([
        redPromise,
        greenPromise
    ]);

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

    return {
        managers: [
            ...redUsers.map(user => ({
                ...user,
                division: 'red'
            })),

            ...greenUsers.map(user => ({
                ...user,
                division: 'green'
            }))
        ]
    };
}
