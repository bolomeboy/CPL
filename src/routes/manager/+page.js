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
    segundaLeagueID
} from '$lib/utils/leagueInfo';


/*
 * ============================================================
 * CPL WEBSITE MANAGER NAMES
 * ============================================================
 */

const managerNames = {

    // RED
    '471758701842132992': 'JD',
    '608428302964686848': 'Justin',
    '722593452524650496': 'Logan',
    '732848788863037440': 'Gavin',
    '733091325091635200': 'Izzy',
    '733122379001241600': 'Kevin',
    '865009922180509696': 'Daniel',
    '988192038514466816': 'Darin',
    '992145928494637056': 'Tony',
    '1037569461064794112': 'Dylan',
    '1123348972917100544': 'Jonathan',
    '1132795206014742528': 'Brandon',

    // GREEN
    '594665552094486528': 'Grant',
    '733139077938925568': 'Bolo',
    '733897435939725312': 'Tiago',
    '741113728006803456': 'Rui',
    '853030385163038720': 'Xavier',
    '858567127072870400': 'Michael',
    '871263782905794560': 'Lucas',
    '992160347320647680': 'Jacob',
    '1122218839107850240': 'Luke',
    '1134307994403344384': 'Nicholas',
    '1233993787223572480': 'Paul',
    '1314475281792118784': 'Christian'

};


/*
 * ============================================================
 * GET ALL 24 MANAGERS
 * ============================================================
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
     * Build the 24-manager list.
     */
    const managers = [

        ...redUsers.map(user => {

            const id =
                String(user.user_id);

            return {
                ...user,

                user_id: id,

                managerID: id,

                division: 'red',

                name:
                    managerNames[id] ||
                    user.display_name ||
                    user.user_name ||
                    'Unknown Manager'
            };

        }),


        ...greenUsers.map(user => {

            const id =
                String(user.user_id);

            return {
                ...user,

                user_id: id,

                managerID: id,

                division: 'green',

                name:
                    managerNames[id] ||
                    user.display_name ||
                    user.user_name ||
                    'Unknown Manager'
            };

        })

    ];


    /*
     * flipcup1 / Christian.
     *
     * Sleeper is currently not returning him
     * from the Green league users endpoint.
     */
    if (!managers.some(
        manager =>
            String(manager.user_id) ===
            '1314475281792118784'
    )) {

        managers.push({

            user_id:
                '1314475281792118784',

            managerID:
                '1314475281792118784',

            display_name:
                'flipcup1',

            user_name:
                'flipcup1',

            name:
                managerNames[
                    '1314475281792118784'
                ],

            division:
                'green',

            is_bot:
                false,

            is_owner:
                false,

            metadata: {},

            avatar:
                null

        });

    }


    return managers;
}


/*
 * ============================================================
 * PAGE LOAD
 * ============================================================
 */

export async function load({ url }) {

    /*
     * Get all 24 managers.
     */
    const managers =
        await getAllManagers();


    /*
     * Get the real Sleeper manager ID.
     */
    const managerID =
        url?.searchParams?.get('managerID');


    /*
     * Optional roster/year information.
     */
    const rosterID =
        url?.searchParams?.get('rosterID');

    const yearParam =
        url?.searchParams?.get('year');


    /*
     * Determine division.
     */
    const divisionParam =
        url?.searchParams?.get('division');


    const division =
        divisionParam === 'green'
            ? 'green'
            : 'red';


    /*
     * Determine which league to load.
     */
    const queryLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * No manager selected.
     */
    if (!managerID) {

        return {

            manager:
                -1,

            managerID:
                null,

            rosterID:
                null,

            year:
                null,

            division,

            managers,

            managersInfo:
                null,

            queryLeagueID

        };

    }


    /*
     * Load all information for the selected
     * Red or Green league.
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

        manager:
            -1,

        managerID,

        rosterID,

        year:
            yearParam
                ? parseInt(yearParam)
                : null,

        division,

        /*
         * IMPORTANT:
         * This is the complete 24-manager list.
         */
        managers,

        managersInfo,

        queryLeagueID

    };

}