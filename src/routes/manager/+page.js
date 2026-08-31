import {
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
     * FIND CUSTOM MANAGER PROFILE
     * ============================================================
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
     * ============================================================
     * DETERMINE DIVISION
     * ============================================================
     *
     * URL takes priority.
     *
     * Otherwise use the manager profile.
     */

    const urlDivision =
        url?.searchParams?.get('division');


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
     * SELECT SLEEPER LEAGUE
     * ============================================================
     */

    const queryLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * ============================================================
     * NO MANAGER SELECTED
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
     * CORE MANAGER DATA
     * ============================================================
     *
     * These are the pieces required for the actual manager page.
     */

    const rostersPromise =
        getLeagueRosters(
            queryLeagueID
        );


    const leagueTeamManagersPromise =
        getLeagueTeamManagers(
            queryLeagueID
        );


    const leagueDataPromise =
        getLeagueData(
            queryLeagueID
        );


    /*
     * ============================================================
     * OPTIONAL DATA
     * ============================================================
     *
     * Transactions, awards and records should not prevent the
     * manager page from loading.
     *
     * If one of these fails, we provide an empty value instead.
     */

    const transactionsPromise =
        getLeagueTransactions(
            false,
            false,
            queryLeagueID
        )
        .catch(error => {

            console.error(
                'Could not load manager transactions:',
                error
            );

            return {
                transactions: [],
                totals: {}
            };

        });


    const awardsPromise =
        getAwards(
            queryLeagueID
        )
        .catch(error => {

            console.error(
                'Could not load manager awards:',
                error
            );

            return {};

        });


    const recordsPromise =
        getLeagueRecords(
            false,
            queryLeagueID
        )
        .catch(error => {

            console.error(
                'Could not load manager records:',
                error
            );

            return {};

        });


    /*
     * ============================================================
     * MANAGERS INFO
     * ============================================================
     *
     * Keep the original array structure expected by
     * +page.svelte.
     */

    const managersInfo =
        Promise.all([

            rostersPromise,

            leagueTeamManagersPromise,

            leagueDataPromise,

            transactionsPromise,

            awardsPromise,

            recordsPromise

        ]);


    /*
     * ============================================================
     * RETURN PAGE DATA
     * ============================================================
     */

    return {

        managerID,

        rosterID,

        year:
            yearParam
                ? parseInt(yearParam)
                : null,

        division,

        managers:
            managerProfiles,

        manager: -1,

        managersInfo,

        queryLeagueID

    };

}
