import {
    cplLeagueID,
    segundaLeagueID,
    managers as managerProfiles
} from '$lib/utils/leagueInfo';

import { getLeagueTeamManagers } from '$lib/utils/helper';

const FLIPCUP_ID = '1314475281792118784';

export async function load() {

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
     * Combine the current Sleeper users.
     */
    const sleeperUsers = [
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
     * Add Christian manually because he is not
     * currently returned by the Green league.
     */
    if (
        !sleeperUsers.some(
            user =>
                String(user.user_id) === FLIPCUP_ID
        )
    ) {

        sleeperUsers.push({
            user_id: FLIPCUP_ID,
            user_name: 'flipcup1',
            display_name: 'flipcup1',
            division: 'green',
            is_bot: false,
            metadata: {},
            avatar: null
        });

    }


    /*
     * IMPORTANT:
     *
     * leagueInfo.js is now the master list.
     *
     * This guarantees that the custom name,
     * location, photo, favorite team, etc.
     * are used instead of the Sleeper username.
     */
    const managers = managerProfiles.map(profile => {

        const sleeperUser =
            sleeperUsers.find(
                user =>
                    String(user.user_id) ===
                    String(profile.managerID)
            );


        return {

            /*
             * Custom website profile comes first.
             */
            ...profile,

            /*
             * Add Sleeper information without
             * overwriting the custom profile.
             */
            user_id:
                String(profile.managerID),

            sleeperUsername:
                sleeperUser?.user_name ||
                profile.username,

            sleeperDisplayName:
                sleeperUser?.display_name ||
                profile.username,

            sleeperAvatar:
                sleeperUser?.avatar ||
                null,

            metadata:
                sleeperUser?.metadata ||
                {},

            /*
             * Keep division from your profile.
             */
            division:
                profile.division

        };

    });


    /*
     * Load Red and Green team/roster information.
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