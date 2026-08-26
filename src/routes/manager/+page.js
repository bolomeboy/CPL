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

export async function load({ url }) {

    if (!managersObj.length) {
        return false;
    }

    const managerParam = url?.searchParams?.get('manager');

    let manager = -1;

    if (managerParam !== null) {
        const parsedManager = parseInt(managerParam);

        if (
            !isNaN(parsedManager) &&
            parsedManager >= 0 &&
            parsedManager < managersObj.length
        ) {
            manager = parsedManager;
        }
    }

    /*
     * Get the selected manager from the master 24-manager list.
     */
    const selectedManager =
        manager > -1
            ? managersObj[manager]
            : null;

    /*
     * Determine the correct league from the manager's
     * division.
     *
     * Green = Segunda
     * Red = CPL
     */
    const division =
        selectedManager?.division === 'green'
            ? 'green'
            : 'red';

    const queryLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;

    /*
     * Load all manager information from the correct league.
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

        manager,

        managers: managersObj,

        managersInfo,

        queryLeagueID,

        division

    };
}
