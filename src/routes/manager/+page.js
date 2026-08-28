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


export async function load({ url }) {

    /*
     * ============================================================
     * MANAGER ID
     * ============================================================
     */

    const managerID =
        url?.searchParams?.get('managerID');


    /*
     * ============================================================
     * OPTIONAL ROSTER / YEAR
     * ============================================================
     */

    const rosterID =
        url?.searchParams?.get('rosterID');

    const yearParam =
        url?.searchParams?.get('year');


    /*
     * ============================================================
     * DIVISION
     * ============================================================
     *
     * IMPORTANT:
     *
     * Use the URL first.
     *
     * This prevents the page from automatically falling
     * back to Red when switching between divisions.
     */

    const urlDivision =
        url?.searchParams?.get('division');


    /*
     * If the URL explicitly says Green, use Green.
     * Otherwise use the manager profile's division.
     * Default to Red.
     */

    const selectedManager =
        managerID
            ? managerProfiles.find(
                manager =>
                    String(manager.managerID) ===
                    String(managerID)
            )
            : null;


    const division =
        urlDivision === 'green'
            ? 'green'
            : urlDivision === 'red'
                ? 'red'
                : selectedManager?.division === 'green'
                    ? 'green'
                    : 'red';


    /*
     * ============================================================
     * SELECT LEAGUE
     * ============================================================
     */

    const queryLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * ============================================================
     * NO MANAGER
     * ============================================================
     */

    if (!managerID) {

        return {

            manager: -1,

            managerID: null,

            rosterID: null,

            year: null,

            division,

            managers:
                managerProfiles,

            managersInfo: null,

            queryLeagueID

        };

    }


    /*
     * ============================================================
     * LOAD MANAGER'S LEAGUE DATA
     * ============================================================
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
         * Actual Sleeper manager ID.
         */
        managerID,


        /*
         * Roster information if supplied.
         */
        rosterID,


        /*
         * Selected historical year.
         */
        year:
            yearParam
                ? parseInt(yearParam)
                : null,


        /*
         * Red or Green.
         */
        division,


        /*
         * Custom manager profiles.
         */
        managers:
            managerProfiles,


        /*
         * Manager component finds the
         * selected manager from managerID.
         */
        manager: -1,


        /*
         * All data required by Manager.svelte.
         */
        managersInfo,


        /*
         * Useful if other components need it.
         */
        queryLeagueID

    };

}
