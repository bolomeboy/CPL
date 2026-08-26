import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

import { getLeagueTeamManagers } from '$lib/utils/helper';

const FLIPCUP_ID = '1314475281792118784';

export async function load() {

    /*
     * Get all current Sleeper users.
     */
    const [
        redUsersResponse,
        greenUsersResponse
    ] = await Promise.all([

        fetch(
            `https://api.sleeper.app/v1/league/${cplLeagueID}/users`
        ),

        fetch(
            `https://api.sleeper.app/v1/league/${segundaLeagueID}/users`
        )

    ]);


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


    const redUsers =
        await redUsersResponse.json();

    const greenUsers =
        await greenUsersResponse.json();


    /*
     * Build the master list of managers.
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
     * flipcup1 is not currently returned by the
     * Green league users endpoint.
     *
     * Add him to the master list using his
     * real Sleeper ID.
     */
    if (
        !managers.some(
            manager =>
                String(manager.user_id) === FLIPCUP_ID
        )
    ) {

        managers.push({

            user_id: FLIPCUP_ID,

            user_name: 'flipcup1',

            display_name: 'flipcup1',

            is_bot: false,

            division: 'green',

            metadata: {},

            avatar: null

        });

    }


    /*
     * Load the complete roster/team history
     * for both divisions.
     */
    const [
        redLeagueTeamManagers,
        greenLeagueTeamManagers
    ] = await Promise.all([

        getLeagueTeamManagers(cplLeagueID),

        getLeagueTeamManagers(segundaLeagueID)

    ]);


    return {

        managers,

        redLeagueTeamManagers,

        greenLeagueTeamManagers

    };

}
