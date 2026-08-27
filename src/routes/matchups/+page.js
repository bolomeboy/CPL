import {
    getBrackets,
    getLeagueMatchups,
    getLeagueTeamManagers,
    loadPlayers
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';


export async function load({ url, fetch }) {

    /*
     * Determine which division is being viewed.
     *
     * /matchups?division=red
     * /matchups?division=green
     */

    const division =
        url?.searchParams?.get('division') === 'green'
            ? 'green'
            : 'red';


    /*
     * Select the correct Sleeper league.
     */

    const selectedLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * Week number.
     */

    const queryWeek =
        url?.searchParams?.get('week');


    /*
     * Load everything from the
     * selected league.
     */

    return {

        queryWeek:
            isNaN(queryWeek)
                ? null
                : queryWeek,

        matchupsData:
            getLeagueMatchups(
                selectedLeagueID
            ),

        bracketsData:
            getBrackets(
                selectedLeagueID
            ),

        leagueTeamManagersData:
            getLeagueTeamManagers(
                selectedLeagueID
            ),

        playersData:
            loadPlayers(fetch),

        division

    };

}
