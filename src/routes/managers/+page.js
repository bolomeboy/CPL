import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

import { getLeagueTeamManagers } from '$lib/utils/helper';

export async function load() {

    /*
     * Get the actual users directly from Sleeper.
     */
    const redUsersResponse = await fetch(
        `https://api.sleeper.app/v1/league/${cplLeagueID}/users`
    );

    const greenUsersResponse = await fetch(
        `https://api.sleeper.app/v1/league/${segundaLeagueID}/users`
    );

    if (!redUsersResponse.ok) {
        throw new Error(
            `Could not load CPL Red managers: ${redUsersResponse.status}`
        );
    }

    if (!greenUsersResponse.ok) {
        throw new Error(
            `Could not load CPL Green managers: ${greenUsersResponse.status}`
        );
    }

    const redUsers = await redUsersResponse.json();
    const greenUsers = await greenUsersResponse.json();


    /*
     * Build the complete manager list.
     */
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


    /*
     * flipcup1 is not currently returned by the Green
     * league users endpoint, so add him manually.
     */
    if (!managers.some(
        manager =>
            String(manager.user_id) ===
            '1314475281792118784'
    )) {

        managers.push({
            user_id: '1314475281792118784',
            display_name: 'flipcup1',
            user_name: 'flipcup1',
            is_bot: false,
            division: 'green',
            metadata: {},
            avatar: null
        });
    }


    /*
     * Get the actual roster/team history for each league.
     */
    const redLeagueTeamManagers =
        await getLeagueTeamManagers(cplLeagueID);

    const greenLeagueTeamManagers =
        await getLeagueTeamManagers(segundaLeagueID);


    return {
        managers,

        redLeagueTeamManagers,

        greenLeagueTeamManagers
    };
}
