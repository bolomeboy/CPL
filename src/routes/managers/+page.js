import {
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

export async function load() {

    const redUsersResponse = await fetch(
        `https://api.sleeper.app/v1/league/${cplLeagueID}/users`
    );

    const greenUsersResponse = await fetch(
        `https://api.sleeper.app/v1/league/${segundaLeagueID}/users`
    );

    if (!redUsersResponse.ok) {
        throw new Error(
            `Could not load CPL Red managers: ${redUsersResponse.status}`
        );
    }

    if (!greenUsersResponse.ok) {
        throw new Error(
            `Could not load CPL Green managers: ${greenUsersResponse.status}`
        );
    }

    const redUsers = await redUsersResponse.json();
    const greenUsers = await greenUsersResponse.json();

    const managers = [
        ...redUsers.map(user => ({
            ...user,
            division: 'red'
        })),

        ...greenUsers.map(user => ({
            ...user,
            division: 'green'
        }))
    ];

    /*
     * flipcup1 is currently not returned by the
     * Green league users endpoint, so add him manually.
     */
    if (!managers.some(
        manager =>
            String(manager.user_id) ===
            '1314475281792118784'
    )) {

        managers.push({
            user_id: '1314475281792118784',
            display_name: 'flipcup1',
            user_name: 'flipcup1',
            is_bot: false,
            division: 'green',
            metadata: {},
            avatar: null
        });
    }

    /*
     * Load the actual Red and Green league data.
     */
    const [
        redLeagueResponse,
        greenLeagueResponse
    ] = await Promise.all([

        fetch(
            `/api/league-team-managers?league=${cplLeagueID}`
        ),

        fetch(
            `/api/league-team-managers?league=${segundaLeagueID}`
        )

    ]);

    /*
     * If your project does not have the API route above,
     * we will connect these directly to the existing helper
     * in the next step.
     */

    let redLeagueTeamManagers = null;
    let greenLeagueTeamManagers = null;

    if (redLeagueResponse.ok) {
        redLeagueTeamManagers =
            await redLeagueResponse.json();
    }

    if (greenLeagueResponse.ok) {
        greenLeagueTeamManagers =
            await greenLeagueResponse.json();
    }

    return {
        managers,
        redLeagueTeamManagers,
        greenLeagueTeamManagers
    };
}
