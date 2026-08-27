import {
    waitForAll,
    getLeagueRosters,
    getLeagueTeamManagers,
    getLeagueData,
    getLeagueTransactions,
    getAwards,
    getLeagueRecords
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID,
    managers as managerProfiles
} from '$lib/utils/leagueInfo';


/*
 * ============================================================
 * GET ALL 24 MANAGERS
 * ============================================================
 *
 * The manager profiles in leagueInfo.js are the source
 * for custom names, locations, photos, favorite teams, etc.
 *
 * Sleeper is used for the actual user IDs and league data.
 */

async function getAllManagers() {

    const [
        redResponse,
        greenResponse
    ] = await Promise.all([

        fetch(
            `https://api.sleeper.app/v1/league/${cplLeagueID}/users`
        ),

        fetch(
            `https://api.sleeper.app/v1/league/${segundaLeagueID}/users`
        )

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


    const redUsers =
        await redResponse.json();

    const greenUsers =
        await greenResponse.json();


    /*
     * Combine both leagues.
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
     * Add Christian manually because Sleeper isn't
     * returning him from the Green users endpoint.
     */
    if (!sleeperManagers.some(
        manager =>
            String(manager.user_id) ===
            '1314475281792118784'
    )) {

        sleeperManagers.push({

            user_id: '1314475281792118784',

            display_name: 'flipcup1',

            user_name: 'flipcup1',

            division: 'green',

            is_bot: false,

            is_owner: false,

            metadata: {},

            avatar: null

        });

    }


    /*
     * Match Sleeper managers to the profiles
     * in leagueInfo.js.
     */
    return sleeperManagers.map(sleeperManager => {

        const id =
            String(sleeperManager.user_id);


        const profile =
            managerProfiles.find(
                manager =>
                    String(manager.managerID) === id
            );


        /*
         * Profile information from leagueInfo.js
         * overrides the Sleeper display name.
         */
        return {

            ...sleeperManager,

            ...(profile || {}),

            managerID: id,

            user_id: id,

            division:
                profile?.division ||
                sleeperManager.division,

            name:
                profile?.name ||
                sleeperManager.display_name ||
                sleeperManager.user_name ||
                'Unknown Manager'

        };

    });

}


/*
 * ============================================================
 * PAGE LOAD
 * ============================================================
 */

export async function load({ url }) {

    /*
     * Get the complete 24-manager list.
     */
    const managers =
        await getAllManagers();


    /*
     * Manager ID from the URL.
     *
     * Example:
     *
     * /manager?managerID=733139077938925568
     */
    const managerID =
        url?.searchParams?.get('managerID');


    /*
     * Find the selected manager's position
     * in the complete 24-manager list.
     */
    const managerIndex =
        managerID
            ? managers.findIndex(
                manager =>
                    String(manager.managerID) ===
                    String(managerID)
            )
            : -1;


    /*
     * Find the selected manager.
     */
    const selectedManager =
        managerIndex >= 0
            ? managers[managerIndex]
            : null;


    /*
     * Determine division from the actual
     * selected manager.
     */
    const division =
        selectedManager?.division ||
        'red';


    /*
     * Select the correct Sleeper league.
     */
    const queryLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * Optional roster information.
     */
    const rosterID =
        url?.searchParams?.get('rosterID');


    const yearParam =
        url?.searchParams?.get('year');


    /*
     * If no manager was selected,
     * don't load individual-manager data.
     */
    if (!managerID) {

        return {

            manager: -1,

            managerID: null,

            rosterID: null,

            year: null,

            division,

            managers,

            managersInfo: null,

            queryLeagueID

        };

    }


    /*
     * If the manager ID isn't found,
     * send back the manager list information
     * rather than loading the wrong league.
     */
    if (managerIndex === -1) {

        return {

            manager: -1,

            managerID,

            rosterID: null,

            year: null,

            division,

            managers,

            managersInfo: null,

            queryLeagueID

        };

    }


    /*
     * Load all information for the selected
     * manager's league.
     */
    const managersInfo =
        waitForAll(

            getLeagueRosters(
                queryLeagueID
            ),

            getLeagueTeamManagers(
                queryLeagueID
            ),

            getLeagueData(
                queryLeagueID
            ),

            getLeagueTransactions(
                false,
                false,
                queryLeagueID
            ),

            getAwards(
                queryLeagueID
            ),

            getLeagueRecords(
                false,
                queryLeagueID
            )

        );


    return {

        /*
         * This is the position of the manager
         * in the complete 24-manager list.
         *
         * Previous/Next can use this.
         */
        manager:
            managerIndex,

        managerID,

        rosterID,

        year:
            yearParam
                ? parseInt(yearParam)
                : null,

        division,

        /*
         * The complete 24-manager list.
         */
        managers,

        managersInfo,

        queryLeagueID

    };

}
