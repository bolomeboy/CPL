<script>
    import ManagerRow from './ManagerRow.svelte';
    import { managers as managerProfiles } from '$lib/utils/leagueInfo';

    export let managers;
    export let redLeagueTeamManagers;
    export let greenLeagueTeamManagers;

    /*
     * Find the custom CPL profile for a Sleeper manager.
     */
    const getProfile = (manager) => {

        const id = String(
            manager.managerID ||
            manager.user_id
        );

        return managerProfiles.find(
            profile =>
                String(profile.managerID) === id
        );
    };


    /*
     * Combine the Sleeper manager with the
     * custom profile from leagueInfo.js.
     */
    const buildManager = (manager) => {

        const profile = getProfile(manager);

        if (!profile) {
            return manager;
        }

        return {
            ...manager,
            ...profile,

            /*
             * These are always controlled by
             * the CPL profile.
             */
            managerID: String(profile.managerID),
            name: profile.name,
            username: profile.username,
            division: profile.division,
            location: profile.location,
            bio: profile.bio,
            photo: profile.photo,
            fantasyStart: profile.fantasyStart,
            favoriteTeam: profile.favoriteTeam,
            mode: profile.mode,
            rival: profile.rival,
            favoritePlayer: profile.favoritePlayer,
            valuePosition: profile.valuePosition,
            rookieOrVets: profile.rookieOrVets,
            philosophy: profile.philosophy,
            tradingScale: profile.tradingScale,
            preferredContact: profile.preferredContact
        };
    };


    /*
     * Build the final 24-manager list.
     */
    $: finalManagers =
        (managers || []).map(buildManager);


    /*
     * Get the correct league's roster/team data.
     */
    const getLeagueData = (manager) => {

        if (manager.division === 'green') {
            return greenLeagueTeamManagers;
        }

        return redLeagueTeamManagers;
    };
</script>

<style>
    .managerContainer {
        width: 100%;
        margin: 2em 0 5em;
    }

    .managerConstrained {
        width: 97%;
        max-width: 800px;
        margin: 0 auto;
    }

    h2 {
        text-align: center;
        font-size: 2.8em;
        margin: 2em 0 1.5em;
        line-height: 1em;
    }

    .divisionHeader {
        text-align: center;
        font-size: 1.8em;
        margin: 2em 0 1em;
    }

    @media (max-width: 520px) {

        h2 {
            font-size: 2em;
            margin: 1.5em 0 1em;
        }

        .divisionHeader {
            font-size: 1.4em;
        }

    }
</style>


<div class="managerContainer">

    <h2>California Primeira Liga Managers</h2>


    <!-- ===================================================== -->
    <!-- CPL RED -->
    <!-- ===================================================== -->

    <div class="divisionHeader">
        🔴 CPL Red
    </div>

    <div class="managerConstrained">

        {#each finalManagers.filter(manager => manager.division === 'red') as manager}

            <ManagerRow
                {manager}
                leagueTeamManagers={getLeagueData(manager)}
            />

        {/each}

    </div>


    <!-- ===================================================== -->
    <!-- CPL GREEN -->
    <!-- ===================================================== -->

    <div class="divisionHeader">
        🟢 CPL Green
    </div>

    <div class="managerConstrained">

        {#each finalManagers.filter(manager => manager.division === 'green') as manager}

            <ManagerRow
                {manager}
                leagueTeamManagers={getLeagueData(manager)}
            />

        {/each}

    </div>

</div>