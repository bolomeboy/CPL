import {
    getLeagueTeamManagers,
    managers
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

import { waitForAll } from '$lib/utils/helper';

export async function load() {

    if (!managers.length) {
        return {
            managers
        };
    }

    /*
     * Load both leagues.
     *
     * Red = CPL
     * Green = Segunda
     */
    const redLeagueTeamManagersData =
        getLeagueTeamManagers(cplLeagueID);

    const greenLeagueTeamManagersData =
        getLeagueTeamManagers(segundaLeagueID);

    const leagueTeamManagersData = Promise.all([
        redLeagueTeamManagersData,
        greenLeagueTeamManagersData
    ]);

    return {
        managers,
        leagueTeamManagersData
    };
}
