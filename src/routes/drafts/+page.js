import {
    getPreviousDrafts,
    getLeagueTeamManagers,
    loadPlayers
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';


export async function load({ fetch }) {

    /*
     * ============================================================
     * CPL RED
     * ============================================================
     */

    const redPreviousDraftsData =
        getPreviousDrafts(cplLeagueID);

    const redLeagueTeamManagersData =
        getLeagueTeamManagers(cplLeagueID);


    /*
     * ============================================================
     * CPL GREEN
     * ============================================================
     */

    const greenPreviousDraftsData =
        getPreviousDrafts(segundaLeagueID);

    const greenLeagueTeamManagersData =
        getLeagueTeamManagers(segundaLeagueID);


    /*
     * ============================================================
     * PLAYERS
     * ============================================================
     */

    const playersData =
        loadPlayers(fetch);


    return {

        redPreviousDraftsData,

        greenPreviousDraftsData,

        redLeagueTeamManagersData,

        greenLeagueTeamManagersData,

        playersData

    };

}
