<script>
    import { Drafts } from '$lib/components';

    export let data;

    const {
        cplDraftsData,
        cplPreviousDraftsData,
        leagueTeamManagersData,
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
        {cplDraftsData}
        {cplPreviousDraftsData}
        {leagueTeamManagersData}
        {playersData}
    />
</div>
