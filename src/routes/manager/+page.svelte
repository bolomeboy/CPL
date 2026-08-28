<script>
    import LinearProgress from '@smui/linear-progress';
    import { Manager } from '$lib/components';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';


    export let data;


    /*
     * ============================================================
     * PAGE DATA
     * ============================================================
     */

    $: manager = data.manager;
    $: managerID = data.managerID;
    $: rosterID = data.rosterID;
    $: year = data.year;
    $: division = data.division;
    $: managers = data.managers;
    $: managersInfo = data.managersInfo;


    /*
     * ============================================================
     * RED / GREEN DIVISION
     * ============================================================
     *
     * Keep the division from the URL/profile.
     */

    $: currentDivision =
        $page.url.searchParams.get('division') === 'green'
            ? 'green'
            : division === 'green'
                ? 'green'
                : 'red';


    /*
     * ============================================================
     * NO MANAGER SELECTED
     * ============================================================
     */

    $: if (!managerID && $page.url.pathname === '/manager') {

        /*
         * Only redirect if the page was actually opened
         * without a manager.
         */
        goto(
            `/managers?division=${currentDivision}`,
            {
                replaceState: true
            }
        );

    }

</script>


<style>

    .main {
        position: relative;
        z-index: 1;
        width: 100%;
    }


    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }


    .error {
        text-align: center;
        margin: 80px auto;
        width: 85%;
        max-width: 600px;
    }

</style>


<div class="main">

    {#if managersInfo}

        {#await managersInfo}

            <div class="loading">

                <p>
                    Retrieving
                    {currentDivision === 'green'
                        ? 'CPL Green'
                        : 'CPL Red'}
                    manager...
                </p>

                <LinearProgress indeterminate />

            </div>


        {:then [
            rostersData,
            leagueTeamManagers,
            leagueData,
            transactionsData,
            awards,
            records
        ]}

            {#key `${managerID}-${currentDivision}`}

                <Manager
                    {awards}
                    {records}
                    {manager}
                    {managerID}
                    {rosterID}
                    {year}
                    division={currentDivision}
                    {managers}
                    {rostersData}
                    {leagueTeamManagers}
                    rosterPositions={leagueData.roster_positions}
                    {transactionsData}
                />

            {/key}


        {:catch error}

            <div class="error">

                <p>
                    Something went wrong:
                    {error.message}
                </p>

            </div>

        {/await}


    {:else if managerID}

        <div class="loading">

            <p>
                Loading manager...
            </p>

            <LinearProgress indeterminate />

        </div>


    {/if}

</div>
