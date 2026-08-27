<script>
    import { Drafts } from '$lib/components';

    export let data;

    const {
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

    <!-- ===================================================== -->
    <!-- CPL RED -->
    <!-- ===================================================== -->

    <Drafts
        leagueName="CPL Red"
        logo="/CPL-Red-logo.png"
        division="red"
        previousDraftsData={redPreviousDraftsData}
        leagueTeamManagersData={redLeagueTeamManagersData}
        {playersData}
    />


    <!-- ===================================================== -->
    <!-- CPL GREEN -->
    <!-- ===================================================== -->

    <Drafts
        leagueName="CPL Green"
        logo="/CPL-Green-logo.png"
        division="green"
        previousDraftsData={greenPreviousDraftsData}
        leagueTeamManagersData={greenLeagueTeamManagersData}
        {playersData}
    />

</div>
