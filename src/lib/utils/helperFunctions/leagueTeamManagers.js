import { leagueID, managers } from '$lib/utils/leagueInfo';
import { get } from 'svelte/store';
import { teamManagersStore } from '$lib/stores';
import { waitForAll } from './multiPromise';
import { getManagers, getTeamData } from './universalFunctions';
import { getLeagueData } from './leagueData';

export const getLeagueTeamManagers = async (
    queryLeagueID = leagueID
) => {

    /*
     * Keep Red and Green data separate.
     * The store is keyed by league ID.
     */
    const storedData =
        get(teamManagersStore);

    if (
        storedData &&
        storedData[queryLeagueID]
    ) {

        return storedData[queryLeagueID];

    }


    let currentLeagueID =
        queryLeagueID;


    let teamManagersMap = {};

    let finalUsers = {};

    let currentSeason = null;


    /*
     * Loop through all seasons for the
     * selected league and create:
     *
     * [year][roster_id] = team/managers
     */
    while (
        currentLeagueID &&
        currentLeagueID != 0
    ) {

        const [
            usersRaw,
            leagueData,
            rostersRaw
        ] = await waitForAll(

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
            ),

        ).catch((err) => {

            console.error(err);

        });


        if (
            !usersRaw ||
            !rostersRaw ||
            !leagueData
        ) {

            return null;

        }


        const [
            users,
            rosters
        ] = await waitForAll(

            usersRaw.json(),

            rostersRaw.json(),

        ).catch((err) => {

            console.error(err);

        });


        const year =
            parseInt(
                leagueData.season
            );


        /*
         * Move to the previous season
         * within THIS league's history.
         */
        currentLeagueID =
            leagueData.previous_league_id;


        if (!currentSeason) {

            currentSeason =
                year;

        }


        teamManagersMap[year] = {};


        const processedUsers =
            processUsers(users);


        /*
         * Don't overwrite newer user
         * information with older seasons.
         */
        for (
            const processedUserKey
            in processedUsers
        ) {

            if (
                finalUsers[
                    processedUserKey
                ]
            ) {

                continue;

            }


            finalUsers[
                processedUserKey
            ] =
                processedUsers[
                    processedUserKey
                ];

        }


        /*
         * Build the roster → team/manager map.
         */
        for (
            const roster
            of rosters
        ) {

            teamManagersMap[
                year
            ][
                roster.roster_id
            ] = {

                team:
                    getTeamData(
                        processedUsers,
                        roster.owner_id
                    ),

                managers:
                    getManagers(
                        roster,
                        processedUsers
                    ),

            };

        }

    }


    const response = {

        currentSeason,

        teamManagersMap,

        users:
            finalUsers,

        leagueID:
            queryLeagueID,

    };


    /*
     * Store the result under the
     * selected league ID.
     */
    teamManagersStore.update(
        (store) => {

            store[
                queryLeagueID
            ] = response;

            return store;

        }
    );


    return response;

};


const processUsers = (
    rawUsers
) => {

    let finalUsers = {};


    for (
        const user
        of rawUsers
    ) {

        user.user_name =
            user.user_name ??
            user.display_name;


        finalUsers[
            user.user_id
        ] = user;


        const manager =
            managers.find(
                m =>
                    m.managerID ===
                    user.user_id
            );


        if (manager) {

            finalUsers[
                user.user_id
            ].display_name =
                manager.name;

        }

    }


    return finalUsers;

};