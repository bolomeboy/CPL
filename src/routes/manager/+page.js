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
     * Get the manager ID from the URL.
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
     * Find the selected manager in the
     * custom manager profile list.
     */
    const selectedManager =
        managerID
            ? managerProfiles.find(
                manager =>
                    String(manager.managerID) ===
                    String(managerID)
            )
            : null;


    /*
     * Determine division from the manager profile.
     *
     * Green = CPL Green
     * Red = CPL Red
     */
    const division =
        selectedManager?.division === 'green'
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
     * No manager selected.
     */
    if (!managerID) {

        return {

            manager: -1,

            managerID: null,

            rosterID: null,

            year: null,

            division,

            managers: managerProfiles,

            managersInfo: null,

            queryLeagueID

        };

    }


    /*
     * Load the selected manager's league data.
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
         * Keep the actual Sleeper ID.
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
         * IMPORTANT:
         *
         * Pass the entire custom manager profile
         * list to Manager.svelte.
         *
         * This is what allows custom names,
         * locations, favorite teams, etc.
         * to work.
         */
        managers: managerProfiles,

        manager: -1,

        managersInfo,

        queryLeagueID

    };

}
