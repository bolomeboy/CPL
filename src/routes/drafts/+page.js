import {
    getCplDrafts,
    getCplPreviousDrafts,
    getLeagueTeamManagers,
    loadPlayers
} from '$lib/utils/helper';

export async function load({ fetch }) {
    const cplDraftsData = getCplDrafts();
    const cplPreviousDraftsData = getCplPreviousDrafts();
    const leagueTeamManagersData = getLeagueTeamManagers();
    const playersData = loadPlayers(fetch);

    return {
        cplDraftsData,
        cplPreviousDraftsData,
        leagueTeamManagersData,
        playersData,
    };
}
