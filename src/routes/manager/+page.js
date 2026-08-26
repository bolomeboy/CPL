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


export async function load({ url }) {

    /*
     * Get the real Sleeper manager ID from the URL.
     */
    const managerID =
        url?.searchParams?.get('managerID');


    /*
     * Get optional roster/year information.
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
     * Select the correct Sleeper league.
     */
    const queryLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * If there is no Sleeper manager ID,
     * send the user back to the manager list.
     */
    if (!managerID) {

        return {
            manager: -1,
            managerID: null,
            rosterID: null,
            year: null,
            division,
            managers: managersObj
            managersInfo: null,
            queryLeagueID
        };

    }


    /*
     * Load the manager's league data.
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
         * The actual Sleeper ID.
         */
        managerID,

        /*
         * Keep these available for the Manager component.
         */
        rosterID,

        year:
            yearParam
                ? parseInt(yearParam)
                : null,

        division,

        /*
         * We no longer depend on the old manager array.
         */
        manager: -1,

        managers: [],

        managersInfo,

        queryLeagueID

    };

}