import { leagueID, cplLeagueID, segundaLeagueID, managers } from '$lib/utils/leagueInfo';
import { get } from 'svelte/store';
import { teamManagersStore } from '$lib/stores';
import { waitForAll } from './multiPromise';
import { getManagers, getTeamData } from './universalFunctions';
import { getLeagueData } from './leagueData';


// ============================================================
// SLEEPER USER IDS
// ============================================================

// CPL RED
const redManagerIDs = [
    '1037569461064794112', // Dillydilly71
    '992145928494637056',  // TonyMedeiros
    '733091325091635200',  // BlicaLicker
    '1132795206014742528', // pombinhamaster42069
    '1123348972917100544', // Jmendes27
    '608428302964686848',  // justindocanto
    '722593452524650496',  // loganlourenco
    '733122379001241600',  // cuckhold97
    '988192038514466816',  // DMACE11
    '732848788863037440',  // GavinSilva
    '865009922180509696',  // dalexandre
    '471758701842132992'   // JDizzle09
];


// CPL GREEN
const greenManagerIDs = [
    '871263782905794560',  // Lucasfon18
    '992160347320647680',  // lacobjopes
    '733139077938925568',  // emilioanaya
    '1134307994403344384', // Nicholassilv
    '858567127072870400',  // mpires1
    '733897435939725312',  // LinguicaLicker
    '1122218839107850240', // LJorge
    '853030385163038720',  // Xavierg35
    '1233993787223572480', // Duarte3
    // Christian is currently OPEN
    '594665552094486528'   // grantsilva
];


// ============================================================
// GET MANAGERS FOR A SPECIFIC LEAGUE
// ============================================================

export const getLeagueTeamManagers = async (queryLeagueID = leagueID) => {

    /*
     * If we're requesting the original league and already
     * have the data cached, return it.
     */
    if (
        queryLeagueID === leagueID &&
        get(teamManagersStore) &&
        get(teamManagersStore).currentSeason
    ) {
        return get(teamManagersStore);
    }


    let currentLeagueID = queryLeagueID;

    let teamManagersMap = {};
    let finalUsers = {};
    let currentSeason = null;


    /*
     * Walk backwards through the Sleeper league history.
     *
     * Each season has its own Sleeper league ID.
     */
    while (currentLeagueID && currentLeagueID != 0) {

        const [
            usersRaw,
            leagueData,
            rostersRaw
        ] = await waitForAll(

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
            console.error(err);
        });


        const [
            users,
            rosters
        ] = await waitForAll(

            usersRaw.json(),
            rostersRaw.json()

        ).catch((err) => {
            console.error(err);
        });


        const year = parseInt(leagueData.season);

        currentLeagueID = leagueData.previous_league_id;


        if (!currentSeason) {
            currentSeason = year;
        }


        teamManagersMap[year] = {};


        /*
         * Convert Sleeper users into our user map.
         */
        const processedUsers = processUsers(users);


        /*
         * Keep the most recent version of each Sleeper user.
         */
        for (const processedUserKey in processedUsers) {

            if (finalUsers[processedUserKey]) {
                continue;
            }

            finalUsers[processedUserKey] =
                processedUsers[processedUserKey];
        }


        /*
         * Connect each Sleeper roster to its managers.
         */
        for (const roster of rosters) {

            teamManagersMap[year][roster.roster_id] = {

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


    /*
     * Determine which division this league belongs to.
     */
    let division = 'red';

    if (queryLeagueID === segundaLeagueID) {
        division = 'green';
    }


    const response = {

        currentSeason,

        teamManagersMap,

        users: finalUsers,

        division,

        leagueID: queryLeagueID,

    };


    /*
     * Only cache the main league in the existing store.
     *
     * This prevents Green from overwriting Red data.
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

const processUsers = (rawUsers) => {

    let finalUsers = {};


    for (const user of rawUsers) {

        /*
         * Sleeper username is the source of truth.
         */
        user.user_name =
            user.user_name ??
            user.display_name;


        /*
         * Keep the actual Sleeper user ID as the key.
         */
        finalUsers[user.user_id] = user;


        /*
         * If the existing league manager database has
         * information for this Sleeper user, preserve
         * the website's manager information.
         */
        const manager = managers.find(
            m => m.managerID === user.user_id
        );


        if (manager) {

            /*
             * Keep the custom website name if one exists.
             * The actual Sleeper username remains available
             * as user.user_name / display_name.
             */
            if (manager.name) {
                finalUsers[user.user_id].website_name =
                    manager.name;
            }

        }

    }


    return finalUsers;
};