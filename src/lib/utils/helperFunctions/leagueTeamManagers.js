import {
    leagueID,
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

import { get } from 'svelte/store';
import { teamManagersStore } from '$lib/stores';
import { waitForAll } from './multiPromise';
import { getManagers, getTeamData } from './universalFunctions';
import { getLeagueData } from './leagueData';


// ============================================================
// GET MANAGERS FOR A SPECIFIC LEAGUE
// ============================================================

export const getLeagueTeamManagers = async (
    queryLeagueID = leagueID
) => {

    /*
     * Keep Red and Green completely separate.
     */

    if (
        queryLeagueID === leagueID &&
        get(teamManagersStore)?.currentSeason
    ) {

        return get(teamManagersStore);

    }


    let currentLeagueID =
        queryLeagueID;

    const teamManagersMap = {};
    const finalUsers = {};

    let currentSeason = null;


    /*
     * Walk through the current league and
     * its previous seasons.
     */

    while (
        currentLeagueID &&
        currentLeagueID != 0
    ) {

        const results =
            await waitForAll(

                fetch(
                    `https://api.sleeper.app/v1/league/${currentLeagueID}/users`,
                    {
                        compress: true
                    }
                ),

                getLeagueData(
                    currentLeagueID
                ),

                fetch(
                    `https://api.sleeper.app/v1/league/${currentLeagueID}/rosters`,
                    {
                        compress: true
                    }
                )

            ).catch((err) => {

                console.error(
                    'Error loading league managers:',
                    err
                );

                return null;

            });


        if (!results) {

            throw new Error(
                `Unable to load Sleeper league ${currentLeagueID}`
            );

        }


        const [
            usersRaw,
            leagueData,
            rostersRaw
        ] = results;


        if (
            !usersRaw ||
            !usersRaw.ok ||
            !rostersRaw ||
            !rostersRaw.ok ||
            !leagueData
        ) {

            throw new Error(
                `Unable to load data for Sleeper league ${currentLeagueID}`
            );

        }


        const users =
            await usersRaw.json();

        const rosters =
            await rostersRaw.json();


        const year =
            parseInt(
                leagueData.season
            );


        /*
         * The first league loaded is the
         * current season.
         */

        if (!currentSeason) {

            currentSeason =
                year;

        }


        teamManagersMap[year] = {};


        /*
         * Convert Sleeper users into a map.
         */

        const processedUsers =
            processUsers(users);


        /*
         * Keep the newest version of
         * each user.
         */

        for (
            const userID
            in processedUsers
        ) {

            if (!finalUsers[userID]) {

                finalUsers[userID] =
                    processedUsers[userID];

            }

        }


        /*
         * Connect every roster to its managers.
         */

        for (
            const roster
            of rosters
        ) {

            const rosterID =
                String(
                    roster.roster_id
                );


            const ownerID =
                roster.owner_id
                    ? String(roster.owner_id)
                    : null;


            const managers =
                getManagers(
                    roster
                )
                .map(
                    id =>
                        String(id)
                );


            /*
             * Build the team information from
             * the actual roster.
             */

            let team =
                getTeamData(
                    processedUsers,
                    ownerID
                );


            /*
             * Sleeper team name can also exist
             * directly on roster metadata.
             */

            const rosterTeamName =
                roster.metadata?.team_name ||
                roster.settings?.team_name ||
                null;


            if (rosterTeamName) {

                team = {

                    ...team,

                    name:
                        rosterTeamName

                };

            }


            /*
             * Sleeper sometimes stores the actual
             * team logo in roster metadata.
             *
             * Prefer that over the manager avatar.
             */

            const rosterAvatar =
                roster.metadata?.avatar ||
                roster.metadata?.team_avatar ||
                roster.metadata?.team_logo ||
                null;


            if (rosterAvatar) {

                team = {

                    ...team,

                    avatar:
                        rosterAvatar

                };

            }


            teamManagersMap[year][rosterID] = {

                team,

                managers

            };

        }


        /*
         * Move to the previous season.
         */

        currentLeagueID =
            leagueData.previous_league_id;

    }


    /*
     * Determine the division.
     */

    const division =
        queryLeagueID === segundaLeagueID
            ? 'green'
            : 'red';


    const response = {

        currentSeason,

        teamManagersMap,

        users:
            finalUsers,

        division,

        leagueID:
            queryLeagueID

    };


    /*
     * Only store Red in the old global store.
     *
     * Green remains independent.
     */

    if (
        queryLeagueID === leagueID
    ) {

        teamManagersStore.update(
            () => response
        );

    }


    return response;

};


// ============================================================
// PROCESS SLEEPER USERS
// ============================================================

const processUsers = (
    rawUsers = []
) => {

    const finalUsers = {};


    for (
        const user
        of rawUsers
    ) {

        user.user_name =
            user.user_name ??
            user.display_name;


        finalUsers[
            String(user.user_id)
        ] =
            user;

    }


    return finalUsers;

};