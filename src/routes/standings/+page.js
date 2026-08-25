import {
    getLeagueStandings,
    getLeagueTeamManagers
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';


export async function load({ url }) {

    /*
     * Determine which league the user is viewing
     *
     * /cpl/standings      → CPL Red
     * /segunda/standings  → CPL Green
     */

    const isGreen =
        url.pathname.startsWith('/segunda');


    const selectedLeagueID =
        isGreen
            ? segundaLeagueID
            : cplLeagueID;


    const standingsData =
        await getLeagueStandings(
            selectedLeagueID
        );


    const leagueTeamManagersData =
        getLeagueTeamManagers(
            selectedLeagueID
        );


    return {

        standingsData,

        leagueTeamManagersData,

    };
}