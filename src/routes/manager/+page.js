import {
    waitForAll,
    getLeagueRosters,
    getLeagueTeamManagers,
    getLeagueData,
    getLeagueTransactions,
    getAwards,
    getLeagueRecords,
    managers as managersObj
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';


/*
 * ============================================================
 * CPL WEBSITE MANAGER NAMES
 * ============================================================
 *
 * The Sleeper username/ID stays the same.
 * These are only the names displayed on the website.
 *
 * Add/change names here whenever you want.
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
    '1233993787223572480': 'Duarte',
    '1314475281792118784': 'Christian'

};


/*
 * ============================================================
 * BUILD THE 24-MANAGER LIST
 * ============================================================
 *
 * This uses the manager list already created from Sleeper.
 * We simply add our website display name to each manager.
 */

const buildManagers = () => {

    return managersObj.map(manager => {

        const id =
            manager.managerID ||
            manager.user_id;

        return {
            ...manager,

            managerID:
                id
                    ? String(id)
                    : null,

            user_id:
                manager.user_id ||
                manager.managerID,

            name:
                managerNames[String(id)] ||
                manager.display_name ||
                manager.user_name ||
                'Unknown Manager'

        };

    });

};


export async function load({ url }) {

    /*
     * Build the complete 24-manager list.
     */
    const managers =
        buildManagers();


    /*
     * Get the real Sleeper manager ID from the URL.
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
     * Determine the manager's division.
     */
    const divisionParam =
        url?.searchParams?.get('division');


    const division =
        divisionParam === 'green'
            ? 'green'
            : 'red';


    /*
     * Select the correct league.
     *
     * Red = CPL
     * Green = Segunda
     */
    const queryLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * If somebody visits /manager without
     * selecting a manager, return the manager
     * list but don't load an individual profile.
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
     * Load information from the correct league.
     */
    const managersInfo = waitForAll(

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
         * Real Sleeper manager ID.
         */
        managerID,

        /*
         * Optional roster information.
         */
        rosterID,

        year:
            yearParam
                ? parseInt(yearParam)
                : null,

        division,

        /*
         * Keep the entire 24-manager list available
         * to Manager.svelte so Previous/Next works.
         */
        managers,

        manager: -1,

        managersInfo,

        queryLeagueID

    };

}