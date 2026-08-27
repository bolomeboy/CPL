import {
    getLeagueTransactions,
    loadPlayers,
    getLeagueTeamManagers
} from '$lib/utils/helper';

import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';


export async function load({ url, fetch }) {

    /*
     * Determine which division is being viewed.
     */

    const division =
        url?.searchParams?.get('division') === 'green'
            ? 'green'
            : 'red';


    /*
     * Select the correct league.
     */

    const selectedLeagueID =
        division === 'green'
            ? segundaLeagueID
            : cplLeagueID;


    /*
     * Existing filters.
     */

    const show =
        url?.searchParams?.get('show');

    const query =
        url?.searchParams?.get('query');

    const curPage =
        url?.searchParams?.get('page');


    /*
     * Load transactions from the
     * selected Red or Green league.
     */

    const transactionsData =
        getLeagueTransactions(
            false,
            false,
            selectedLeagueID
        );


    /*
     * Load team/manager data from
     * the same league.
     */

    const leagueTeamManagersData =
        getLeagueTeamManagers(
            selectedLeagueID
        );


    /*
     * Players are shared league-wide.
     */

    const playersData =
        loadPlayers(fetch);


    const bannedValued = [
        'undefined'
    ];


    const props = {

        show: 'both',

        query: '',

        playersData,

        transactionsData,

        leagueTeamManagersData,

        page: 0,

        division

    };


    /*
     * Transaction filter.
     */

    if (
        show &&
        (
            show === 'trade' ||
            show === 'waiver' ||
            show === 'both'
        )
    ) {

        props.show = show;

    }


    /*
     * Search query.
     */

    if (
        query &&
        !bannedValued.includes(query)
    ) {

        props.query = query;

    }


    /*
     * Page number.
     */

    if (
        curPage &&
        !isNaN(curPage)
    ) {

        props.page =
            parseInt(curPage) - 1;

    }


    return props;

}
