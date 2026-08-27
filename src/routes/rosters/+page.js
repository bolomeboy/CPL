import {
    getLeagueData,
    getLeagueRosters,
    getLeagueTeamManagers,
    loadPlayers,
    waitForAll
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';


export async function load({ url, fetch }) {

    /*
     * Determine which division is being viewed.
     *
     * /rosters?division=red
     * /rosters?division=green
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
     * Load roster information from
     * the selected league.
     */

    const rostersInfo =
        waitForAll(

            getLeagueData(
                selectedLeagueID
            ),

            getLeagueRosters(
                selectedLeagueID
            ),

            getLeagueTeamManagers(
                selectedLeagueID
            ),

            loadPlayers(
                fetch
            )

        );


    return {

        rostersInfo,

        division

    };

}
