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
     * Determine division from the URL.
     *
     * /standings?division=red
     * /standings?division=green
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
     * Load standings from the selected league.
     */

    const standingsData =
        await getLeagueStandings(
            selectedLeagueID
        );


    /*
     * Load team/manager information
     * from the same league.
     */

    const leagueTeamManagersData =
        getLeagueTeamManagers(
            selectedLeagueID
        );


    return {

        standingsData,

        leagueTeamManagersData,

        division

    };

}
