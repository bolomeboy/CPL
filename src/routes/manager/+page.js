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

    const managerID =
        url?.searchParams?.get('managerID');

    const rosterID =
        url?.searchParams?.get('rosterID');

    const yearParam =
        url?.searchParams?.get('year');

    const divisionParam =
        url?.searchParams?.get('division');

    /*
     * If the URL contains a Sleeper manager ID,
     * use that to determine which league to load.
     *
     * Green managers use segundaLeagueID.
     * Red managers use cplLeagueID.
     */

    const greenManagerIDs = [
        '871263782905794560',  // Lucasfon18
        '992160347320647680',  // lacobjopes
        '733139077938925568',  // emilioanaya
        '1134307994403344384', // Nicholassilv
        '858567127072870400',  // mpires1
        '733897435939725312',  // LinguicaLicker
        '1122218839107850240', // LJorge
        '853030385163038720',  // Xavierg35
        '1233993787223572480', // Duarte3
        '594665552094486528'   // grantsilva
    ];

    const redManagerIDs = [
        '1037569461064794112', // Dillydilly71
        '992145928494637056',  // TonyMedeiros
        '733091325091635200',  // BlicaLicker
        '1132795206014742528', // pombinhamaster42069
        '1123348972917100544', // Jmendes27
        '608428302964686848',  // justindocanto
        '722593452524650496',  // loganlourenco
        '733122379001241600',  // cuckhold97
        '988192038514466816',  // DMACE11
        '732848788863037440',  // GavinSilva
        '865009922180509696',  // dalexandre
        '471758701842132992'   // JDizzle09
    ];

    /*
     * Determine which league we are viewing.
     */

    let queryLeagueID = cplLeagueID;
    let division = 'red';

    if (
        managerID &&
        greenManagerIDs.includes(String(managerID))
    ) {
        queryLeagueID = segundaLeagueID;
        division = 'green';
    } else if (
        divisionParam === 'green'
    ) {
        queryLeagueID = segundaLeagueID;
        division = 'green';
    } else if (
        divisionParam === 'red'
    ) {
        queryLeagueID = cplLeagueID;
        division = 'red';
    }

    /*
     * If this is an existing manager from the old
     * manager database, find their index.
     */

    let manager = -1;

    if (managerParam !== null) {

        const parsedManager =
            parseInt(managerParam);

        if (
            !isNaN(parsedManager) &&
            parsedManager >= 0 &&
            parsedManager < managersObj.length
        ) {
            manager = parsedManager;
        }
    }

    /*
     * If we were given a Sleeper manager ID but it
     * exists in the old manager database, use its index.
     */

    if (manager === -1 && managerID) {

        const foundIndex =
            managersObj.findIndex(
                m =>
                    String(m.managerID) ===
                    String(managerID)
            );

        if (foundIndex > -1) {
            manager = foundIndex;
        }
    }

    /*
     * Load all information from the correct league.
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

        managerID,

        rosterID,

        year:
            yearParam
                ? parseInt(yearParam)
                : null,

        division,

        managers:
            managersObj,

        managersInfo,

        queryLeagueID
    };
}