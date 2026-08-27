import {
    cplLeagueID,
    segundaLeagueID,
    managers as managerProfiles
} from '$lib/utils/leagueInfo';

import { getLeagueTeamManagers } from '$lib/utils/helper';

const FLIPCUP_ID = '1314475281792118784';

export async function load() {

    /*
     * Get all current Sleeper users from both leagues.
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
     * Build the raw Sleeper manager list.
     */
    const sleeperManagers = [

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
     */
    if (
        !sleeperManagers.some(
            manager =>
                String(manager.user_id) === FLIPCUP_ID
        )
    ) {

        sleeperManagers.push({

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
     * Combine Sleeper information with the
     * custom manager profiles from leagueInfo.js.
     *
     * leagueInfo.js controls:
     *
     * name
     * location
     * bio
     * photo
     * fantasyStart
     * favoriteTeam
     * rival
     * favoritePlayer
     * valuePosition
     * rookieOrVets
     * philosophy
     * tradingScale
     * preferredContact
     */
    const managers = sleeperManagers.map(sleeperManager => {

        const managerID =
            String(sleeperManager.user_id);


        const profile =
            managerProfiles.find(
                manager =>
                    String(manager.managerID) === managerID
            );


        /*
         * If we have a profile in leagueInfo.js,
         * use that profile as the main manager data.
         */
        if (profile) {

            return {

                ...sleeperManager,

                ...profile,

                managerID,

                user_id: managerID,

                division:
                    profile.division ||
                    sleeperManager.division,

                /*
                 * Keep the real Sleeper information
                 * available too.
                 */
                sleeperUsername:
                    sleeperManager.user_name,

                sleeperDisplayName:
                    sleeperManager.display_name

            };

        }


        /*
         * Fallback for a Sleeper manager that doesn't
         * have a profile yet.
         */
        return {

            ...sleeperManager,

            managerID,

            user_id: managerID,

            name:
                sleeperManager.display_name ||
                sleeperManager.user_name ||
                'Unknown Manager'

        };

    });


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