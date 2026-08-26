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
     * Keep the original store behavior for the main league.
     *
     * Red and Green are loaded independently, so Green
     * will never overwrite Red.
     */
    if (
        queryLeagueID === leagueID &&
        get(teamManagersStore)?.currentSeason
    ) {
        return get(teamManagersStore);
    }


    let currentLeagueID = queryLeagueID;

    const teamManagersMap = {};
    const finalUsers = {};

    let currentSeason = null;


    /*
     * Walk backwards through every season of this league.
     */
    while (currentLeagueID && currentLeagueID != 0) {

        const results = await waitForAll(

            fetch(
                `https://api.sleeper.app/v1/league/${currentLeagueID}/users`,
                { compress: true }
            ),

            getLeagueData(currentLeagueID),

            fetch(
                `https://api.sleeper.app/v1/league/${currentLeagueID}/rosters`,
                { compress: true }
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


        const users = await usersRaw.json();
        const rosters = await rostersRaw.json();


        const year = parseInt(leagueData.season);


        /*
         * The first league we load is the current season.
         */
        if (!currentSeason) {
            currentSeason = year;
        }


        teamManagersMap[year] = {};


        /*
         * Convert Sleeper users into a user map.
         */
        const processedUsers = processUsers(users);


        /*
         * Keep the newest version of each user.
         */
        for (const userID in processedUsers) {

            if (!finalUsers[userID]) {
                finalUsers[userID] =
                    processedUsers[userID];
            }
        }


        /*
         * Connect every Sleeper roster to its managers.
         */
        for (const roster of rosters) {

            teamManagersMap[year][roster.roster_id] = {

                team: getTeamData(
                    processedUsers,
                    roster.owner_id
                ),

                managers: getManagers(roster)

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
    let division = 'red';

    if (
        queryLeagueID === segundaLeagueID
    ) {
        division = 'green';
    }


    const response = {

        currentSeason,

        teamManagersMap,

        users: finalUsers,

        division,

        leagueID: queryLeagueID

    };


    /*
     * Only save the original league to the
     * existing global store.
     *
     * Green gets its own returned object and does
     * not overwrite the Red data.
     */
    if (queryLeagueID === leagueID) {

        teamManagersStore.update(
            () => response
        );

    }


    return response;
};


// ============================================================
// PROCESS SLEEPER USERS
// ============================================================

const processUsers = (rawUsers = []) => {

    const finalUsers = {};


    for (const user of rawUsers) {

        /*
         * Sleeper is the source of truth.
         */
        user.user_name =
            user.user_name ??
            user.display_name;


        /*
         * Use the actual Sleeper user ID.
         */
        finalUsers[user.user_id] = user;

    }


    return finalUsers;
};
