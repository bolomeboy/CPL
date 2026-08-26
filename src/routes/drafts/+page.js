import {
    getUpcomingDraft,
    getPreviousDrafts,
    getLeagueTeamManagers,
    loadPlayers
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

export async function load({ fetch }) {

    const redDraftData =
        getUpcomingDraft(cplLeagueID);

    const greenDraftData =
        getUpcomingDraft(segundaLeagueID);

    const redPreviousDraftsData =
        getPreviousDrafts(cplLeagueID);

    const greenPreviousDraftsData =
        getPreviousDrafts(segundaLeagueID);

    const redLeagueTeamManagersData =
        getLeagueTeamManagers(cplLeagueID);

    const greenLeagueTeamManagersData =
        getLeagueTeamManagers(segundaLeagueID);

    const playersData =
        loadPlayers(fetch);

    return {
        redDraftData,
        greenDraftData,

        redPreviousDraftsData,
        greenPreviousDraftsData,

        redLeagueTeamManagersData,
        greenLeagueTeamManagersData,

        playersData,
    };
}
