import { getLeagueData } from "./leagueData";
import {
    leagueID,
    cplLeagueID,
    segundaLeagueID
} from '$lib/utils/leagueInfo';

import { getNflState } from "./nflState";
import { waitForAll } from './multiPromise';


/*
 * ============================================================
 * GET MATCHUPS FOR A SPECIFIC LEAGUE
 * ============================================================
 *
 * This function MUST use the league ID passed to it.
 *
 * CPL Red  -> cplLeagueID
 * CPL Green -> segundaLeagueID
 *
 * We do NOT use the global matchupsStore here because that
 * would cause Red's data to be reused for Green.
 */

export const getLeagueMatchups = async (
    queryLeagueID = leagueID
) => {

    /*
     * Get NFL state and the selected league's data.
     */

    const [nflState, leagueData] = await waitForAll(
        getNflState(),
        getLeagueData(queryLeagueID)
    ).catch((err) => {

        console.error(
            'Error loading league matchup information:',
            err
        );

    });


    /*
     * If the league doesn't exist or couldn't be loaded,
     * stop here with a useful error.
     */

    if (!leagueData) {

        throw new Error(
            `Unable to load league matchup data for ${queryLeagueID}`
        );

    }


    /*
     * Determine the current week.
     */

    let week = 1;

    if (nflState?.season_type == 'regular') {

        week =
            nflState.display_week;

    } else if (nflState?.season_type == 'post') {

        week = 18;

    }


    /*
     * Get the season/year from the selected league.
     */

    const year =
        leagueData.season;


    /*
     * Determine how long the regular season is.
     */

    const regularSeasonLength =
        leagueData.settings.playoff_week_start - 1;


    /*
     * ============================================================
     * GET ALL REGULAR-SEASON MATCHUPS
     * ============================================================
     */

    const matchupsPromises = [];


    for (
        let i = 1;
        i <= regularSeasonLength;
        i++
    ) {

        matchupsPromises.push(

            fetch(
                `https://api.sleeper.app/v1/league/${queryLeagueID}/matchups/${i}`,
                {
                    compress: true
                }
            )

        );

    }


    const matchupsRes =
        await waitForAll(
            ...matchupsPromises
        );


    /*
     * ============================================================
     * CONVERT RESPONSES TO JSON
     * ============================================================
     */

    const matchupsJsonPromises = [];


    for (const matchupRes of matchupsRes) {

        const data =
            matchupRes.json();

        matchupsJsonPromises.push(data);


        if (!matchupRes.ok) {

            console.error(
                'Sleeper matchup request failed:',
                data
            );

        }

    }


    const matchupsData =
        await waitForAll(
            ...matchupsJsonPromises
        ).catch((err) => {

            console.error(
                'Error processing matchup data:',
                err
            );

        });


    /*
     * ============================================================
     * PROCESS MATCHUPS
     * ============================================================
     */

    const matchupWeeks = [];


    if (matchupsData) {

        for (
            let i = 1;
            i < matchupsData.length + 1;
            i++
        ) {

            const processed =
                processMatchups(
                    matchupsData[i - 1],
                    i
                );


            if (processed) {

                matchupWeeks.push({

                    matchups:
                        processed.matchups,

                    week:
                        processed.week

                });

            }

        }

    }


    /*
     * ============================================================
     * FINAL RESPONSE
     * ============================================================
     */

    const matchupsResponse = {

        matchupWeeks,

        year,

        week,

        regularSeasonLength

    };


    return matchupsResponse;

};


/*
 * ============================================================
 * PROCESS ONE WEEK OF MATCHUPS
 * ============================================================
 */

const processMatchups = (
    inputMatchups,
    week
) => {

    /*
     * No matchups for this week.
     */

    if (
        !inputMatchups ||
        inputMatchups.length == 0
    ) {

        return false;

    }


    const matchups = {};


    /*
     * Group the Sleeper matchup entries
     * by matchup_id.
     */

    for (const match of inputMatchups) {

        if (!matchups[match.matchup_id]) {

            matchups[match.matchup_id] = [];

        }


        matchups[match.matchup_id].push({

            roster_id:
                match.roster_id,

            starters:
                match.starters,

            points:
                match.starters_points

        });

    }


    return {

        matchups,

        week

    };

};