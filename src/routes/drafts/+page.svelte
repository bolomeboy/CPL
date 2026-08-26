<script>
    import { Drafts } from '$lib/components';

    export let data;

    const {
        redDraftData,
        greenDraftData,
        redPreviousDraftsData,
        greenPreviousDraftsData,
        redLeagueTeamManagersData,
        greenLeagueTeamManagersData,
        playersData
    } = data;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
    }
</style>

<div id="main">

    <Drafts
        leagueName="CPL Red"
        logo="/CPL-Red-logo.png"
        division="red"
        upcomingDraftData={redDraftData}
        previousDraftsData={redPreviousDraftsData}
        leagueTeamManagersData={redLeagueTeamManagersData}
        {playersData}
    />

    <Drafts
        leagueName="CPL Green"
        logo="/CPL-Green-logo.png"
        division="green"
        upcomingDraftData={greenDraftData}
        previousDraftsData={greenPreviousDraftsData}
        leagueTeamManagersData={greenLeagueTeamManagersData}
        {playersData}
    />

</div>