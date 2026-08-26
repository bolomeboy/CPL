import {
    getLeagueTeamManagers,
    managers
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

export async function load() {

    if (!managers.length) {
        return {
            managers,
            leagueTeamManagersData: Promise.resolve([null, null])
        };
    }

    /*
     * Load CPL Red first, then CPL Green.
     *
     * Doing this sequentially prevents the shared
     * teamManagers store/cache from causing one league
     * to overwrite the other.
     */
    const leagueTeamManagersData = (async () => {

        const redLeagueTeamManagers =
            await getLeagueTeamManagers(cplLeagueID);

        const greenLeagueTeamManagers =
            await getLeagueTeamManagers(segundaLeagueID);

        return [
            redLeagueTeamManagers,
            greenLeagueTeamManagers
        ];

    })();

    return {
        managers,
        leagueTeamManagersData
    };
}
