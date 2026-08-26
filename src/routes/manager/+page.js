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

    const managerParam =
        url?.searchParams?.get('manager');

    const manager =
        managerParam !== null
            ? parseInt(managerParam)
            : -1;


    /*
     * Determine which division this manager belongs to.
     *
     * Red managers:
     * 1. Dillydilly
     * 2. Tonymedeiros
     * 3. Blicalicker
     * 4. Pombinhamaster
     * 5. Jmendes27
     * 6. Justindocanto
     * 7. Loganlourenco
     * 8. Cuckhold97
     * 9. DMACE
     * 10. Gavinsilva
     * 11. Dalexandre
     * 12. JDizzle
     *
     * Green managers:
     * 1. Lucasfon
     * 2. Lacobjopes
     * 3. Emilioanaya
     * 4. Nicholassilv
     * 5. Mpires
     * 6. Linguicalicker
     * 7. Ljorge
     * 8. Xavierg
     * 9. Duarte3
     * 10. OPEN
     * 11. Grantsilva
     *
     * IMPORTANT:
     * The manager array currently comes from the original
     * league system, so we identify the division by
     * manager name/user ID rather than assuming the array
     * position represents the Sleeper roster.
     */


    const greenManagerNames = [
        'Lucasfon18',
        'lacobjopes',
        'emilioanaya',
        'Nicholassilv',
        'mpires1',
        'LinguicaLicker',
        'LJorge',
        'Xavierg35',
        'Duarte3',
        'grantsilva'
    ];


    let selectedManager = null;

    if (
        manager >= 0 &&
        manager < managersObj.length
    ) {
        selectedManager =
            managersObj[manager];
    }


    /*
     * Check whether this manager is Green.
     */
    const isGreen =
        selectedManager &&
        (
            greenManagerNames.includes(
                selectedManager.managerID
            ) ||
            greenManagerNames.includes(
                selectedManager.name
            ) ||
            greenManagerNames.includes(
                selectedManager.username
            )
        );


    /*
     * For now, use the manager index to identify
     * the Green managers as well.
     *
     * This is temporary until we connect the manager
     * records directly to Sleeper user IDs.
     */
    const greenNamesLower =
        greenManagerNames.map(
            name => name.toLowerCase()
        );


    const selectedValues = selectedManager
        ? [
            selectedManager.name,
            selectedManager.username,
            selectedManager.display_name
        ]
        : [];


    const selectedIsGreen =
        selectedValues.some(
            value =>
                value &&
                greenNamesLower.includes(
                    value.toLowerCase()
                )
        );


    /*
     * Decide which Sleeper league to use.
     */
    const queryLeagueID =
        selectedIsGreen
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * Get all manager-page data from the SAME league.
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


    const props = {

        manager:
            manager >= 0 &&
            manager < managersObj.length
                ? manager
                : -1,

        managers:
            managersObj,

        managersInfo,

        queryLeagueID,

        division:
            selectedIsGreen
                ? 'green'
                : 'red'
    };


    return props;
}