import { managers as managersObj } from '$lib/utils/leagueInfo';
import { goto } from "$app/navigation";
import { stringDate } from './news';

const QUESTION = 'managers/question.jpg';

export const cleanName = (name) => {
    return name.replace('Team ', '').toLowerCase().replace(/[ ’'!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");
}

export const round = (num) => {
    if(typeof(num) =="string") {
        num = parseFloat(num)
    }
    return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
}

const min = (stats, roundOverride, max) => {
    const num = Math.min(...stats);
    let minAnswer = Math.floor(num / roundOverride) * roundOverride;

    if(max && num > 0) {
        let i = 0;

        while(
            minAnswer > 0 &&
            (num - minAnswer) / (max - minAnswer) < .15
        ) {
            minAnswer -= roundOverride;
            i++;

            if(i > 100) {
                break;
            }
        }
    }

    return minAnswer > 0 ? minAnswer : 0;
}

const max = (stats, roundOverride) => {
    const num = Math.max(...stats);
    return Math.ceil(num / roundOverride) * roundOverride;
}


/*
 * ============================================================
 * GO TO MANAGER
 * ============================================================
 *
 * This version supports:
 *
 * - Clicking a team from Standings
 * - Clicking a team from Rosters
 * - Clicking a manager from Records
 * - Clicking a manager from other pages
 * - managerID directly
 * - rosterID only
 * - Red / Green divisions
 *
 * The important change is that it now uses:
 *
 * /manager?managerID=XXXX&division=red
 *
 * instead of the old:
 *
 * /manager?manager=INDEX
 *
 */

export const gotoManager = ({
    leagueTeamManagers,
    managerID = null,
    rosterID = null,
    year = null,
    division = null
}) => {

    /*
     * ============================================================
     * BASIC VALIDATION
     * ============================================================
     */

    if (!leagueTeamManagers) {

        goto('/managers');

        return;

    }


    /*
     * ============================================================
     * NORMALIZE IDS
     * ============================================================
     */

    let selectedManagerID =
        managerID != null
            ? String(managerID)
            : null;

    let selectedRosterID =
        rosterID != null
            ? String(rosterID)
            : null;


    /*
     * ============================================================
     * FIND ROSTER FROM MANAGER
     * ============================================================
     *
     * If a page gives us a managerID, search every season
     * instead of relying only on the current season.
     *
     * This is especially important for historical records.
     */

    if (
        selectedManagerID &&
        !selectedRosterID
    ) {

        const years =
            Object.keys(
                leagueTeamManagers.teamManagersMap || {}
            )
            .sort(
                (a, b) =>
                    Number(b) - Number(a)
            );


        for (
            const currentYear
            of years
        ) {

            const yearManagers =
                leagueTeamManagers
                    .teamManagersMap?.[
                        currentYear
                    ];


            if (!yearManagers) {
                continue;
            }


            for (
                const currentRosterID
                in yearManagers
            ) {

                const rosterData =
                    yearManagers[
                        currentRosterID
                    ];


                if (
                    !rosterData?.managers
                ) {
                    continue;
                }


                const managerIDs =
                    rosterData.managers.map(
                        id =>
                            String(id)
                    );


                if (
                    managerIDs.includes(
                        selectedManagerID
                    )
                ) {

                    selectedRosterID =
                        String(
                            currentRosterID
                        );

                    /*
                     * Only use the supplied year if there
                     * wasn't already a historical year.
                     */
                    if (!year) {

                        year =
                            Number(
                                currentYear
                            );

                    }

                    break;

                }

            }


            if (selectedRosterID) {
                break;
            }

        }

    }


    /*
     * ============================================================
     * FIND MANAGER FROM ROSTER
     * ============================================================
     *
     * This is what standings, rosters, transactions,
     * awards, records, etc. normally use.
     */

    if (
        !selectedManagerID &&
        selectedRosterID
    ) {

        const years =
            Object.keys(
                leagueTeamManagers.teamManagersMap || {}
            )
            .sort(
                (a, b) =>
                    Number(b) - Number(a)
            );


        /*
         * If a year was supplied, try that year first.
         */
        const orderedYears =
            year
                ? [
                    String(year),
                    ...years.filter(
                        currentYear =>
                            String(currentYear) !==
                            String(year)
                    )
                ]
                : years;


        for (
            const currentYear
            of orderedYears
        ) {

            const yearManagers =
                leagueTeamManagers
                    .teamManagersMap?.[
                        currentYear
                    ];


            if (!yearManagers) {
                continue;
            }


            const rosterData =
                yearManagers[
                    selectedRosterID
                ];


            if (
                !rosterData?.managers?.length
            ) {
                continue;
            }


            /*
             * Use the first manager on the roster.
             *
             * This is the original site's behavior
             * for co-owned teams as well.
             */
            selectedManagerID =
                String(
                    rosterData.managers[0]
                );


            if (!year) {

                year =
                    Number(
                        currentYear
                    );

            }


            break;

        }

    }


    /*
     * ============================================================
     * IF WE STILL DON'T HAVE A MANAGER
     * ============================================================
     */

    if (!selectedManagerID) {

        goto(
            division
                ? `/managers?division=${encodeURIComponent(division)}`
                : '/managers'
        );

        return;

    }


    /*
     * ============================================================
     * DETERMINE DIVISION
     * ============================================================
     *
     * Prefer an explicitly supplied division.
     * Otherwise use the custom CPL manager profile.
     */

    let selectedDivision =
        division === 'green'
            ? 'green'
            : division === 'red'
                ? 'red'
                : null;


    if (!selectedDivision) {

        const managerProfile =
            managersObj?.find(
                manager =>
                    String(
                        manager.managerID
                    ) ===
                    String(
                        selectedManagerID
                    )
            );


        selectedDivision =
            managerProfile?.division === 'green'
                ? 'green'
                : 'red';

    }


    /*
     * ============================================================
     * DEFAULT YEAR
     * ============================================================
     */

    if (!year) {

        year =
            leagueTeamManagers.currentSeason;

    }


    /*
     * ============================================================
     * OPEN INDIVIDUAL MANAGER PAGE
     * ============================================================
     */

    goto(
        `/manager?managerID=${encodeURIComponent(
            String(selectedManagerID)
        )}` +
        `&division=${encodeURIComponent(
            selectedDivision
        )}` +
        `&year=${encodeURIComponent(
            year
        )}` +
        `&rosterID=${encodeURIComponent(
            selectedRosterID || ''
        )}`
    );

};


/*
 * ============================================================
 * AUTHOR
 * ============================================================
 */

export const getAuthor = (
    leagueTeamManagers,
    author
) => {

    for(
        const userID
        in leagueTeamManagers.users
    ) {

        if(
            leagueTeamManagers
                .users[userID]
                .user_name
                .toLowerCase() ==
            author.toLowerCase()
        ) {

            return [
                `<a href="/manager?managerID=${userID}">${leagueTeamManagers.users[userID].display_name}</a>`
            ];

        }

    }

    return author;

}


/*
 * ============================================================
 * AVATAR
 * ============================================================
 */

export const getAvatar = (
    leagueTeamManagers,
    author
) => {

    for(
        const uID
        in leagueTeamManagers.users
    ) {

        if(
            leagueTeamManagers
                .users[uID]
                .user_name
                .toLowerCase() ==
            author.toLowerCase()
        ) {

            return `https://sleepercdn.com/avatars/thumbs/${leagueTeamManagers.users[uID].avatar}`;

        }

    }

    return QUESTION;

}


/*
 * ============================================================
 * DATE
 * ============================================================
 */

export const parseDate = (
    rawDate
) => {

    const ts =
        Date.parse(rawDate);

    const d =
        new Date(ts);

    return stringDate(d);

}


/*
 * ============================================================
 * GRAPH
 * ============================================================
 */

export const generateGraph = (
    {
        stats,
        x,
        stat,
        header,
        field,
        short,
        secondField = null
    },
    year,
    roundOverride = 10,
    xMinOverride = null
) => {

    if(!stats) {
        return null;
    }


    const graph = {

        stats: [],

        secondStats: [],

        managerIDs: [],

        rosterIDs: [],

        labels: {
            x,
            stat
        },

        header,

        xMin: 0,

        xMax: 0,

        short,

        year

    };


    const sortedStats =
        [...stats].sort(
            (a, b) =>
                b[field] -
                a[field]
        );


    for(
        const indivStat
        of sortedStats
    ) {

        graph.stats.push(
            indivStat[field]
        );


        if(secondField) {

            graph.secondStats.push(
                indivStat[secondField]
            );

        }


        if(indivStat.managerID) {

            graph.managerIDs.push(
                indivStat.managerID
            );

            graph.rosterIDs.push(
                null
            );

        } else if(indivStat.rosterID) {

            graph.managerIDs.push(
                null
            );

            graph.rosterIDs.push(
                indivStat.rosterID
            );

        }

    }


    graph.xMax =
        max(
            graph.stats,
            roundOverride
        );


    graph.xMin =
        min(
            graph.stats,
            roundOverride,
            graph.xMax
        );


    if(secondField) {

        graph.xMin =
            min(
                graph.secondStats,
                roundOverride,
                graph.xMax
            );

    }


    if(xMinOverride) {

        graph.xMin =
            xMinOverride;

    }


    return graph;

}


/*
 * ============================================================
 * SORT HIGH / LOW
 * ============================================================
 */

export const sortHighAndLow = (
    arr,
    field
) => {

    const sorted =
        arr.sort(
            (a, b) =>
                b[field] -
                a[field]
        );


    const high =
        sorted.slice(
            0,
            10
        );


    const low =
        sorted
            .slice(-10)
            .reverse();


    return [
        high,
        low
    ];

}


/*
 * ============================================================
 * GET MANAGERS
 * ============================================================
 */

export const getManagers = (
    roster
) => {

    const managers = [];


    if(roster.owner_id) {

        managers.push(
            roster.owner_id
        );

    }


    if(roster.co_owners) {

        for(
            const coOwner
            of roster.co_owners
        ) {

            managers.push(
                coOwner
            );

        }

    }


    return managers;

}


/*
 * ============================================================
 * TEAM DATA
 * ============================================================
 */

export const getTeamData = (
    users,
    ownerID
) => {

    const user =
        ownerID
            ? users?.[
                String(ownerID)
            ]
            : null;


    if (user) {

        /*
         * Sleeper's team name.
         */

        const teamName =
            user.metadata?.team_name ||
            user.display_name ||
            user.user_name ||
            'Unknown Team';


        /*
         * IMPORTANT:
         *
         * Use the team/avatar information available
         * from Sleeper.
         *
         * This is only a fallback. If the roster itself
         * supplies a team logo, leagueTeamManagers.js
         * will prefer that logo.
         */

        let avatar =
            user.metadata?.team_avatar ||
            user.metadata?.team_logo ||
            user.metadata?.avatar ||
            null;


        if (
            !avatar &&
            user.avatar
        ) {

            avatar =
                `https://sleepercdn.com/avatars/thumbs/${user.avatar}`;

        }


        if (!avatar) {

            avatar =
                'https://sleepercdn.com/images/v2/icons/player_default.webp';

        }


        return {

            avatar,

            name:
                teamName

        };

    }


    return {

        avatar:
            'https://sleepercdn.com/images/v2/icons/player_default.webp',

        name:
            'Unknown Team'

    };

};


/*
 * ============================================================
 * TEAM AVATAR FROM TEAM MANAGERS
 * ============================================================
 */

export const getAvatarFromTeamManagers = (
    teamManagers,
    rosterID,
    year
) => {

    if(
        !year ||
        year > teamManagers.currentSeason
    ) {

        year =
            teamManagers.currentSeason;

    }


    const yearManagers =
        teamManagers
            .teamManagersMap
            [year];


    if(yearManagers == null) {

        return QUESTION;

    }


    const roster =
        yearManagers[
            rosterID
        ];


    if(roster == null) {

        return QUESTION;

    }


    return roster.team?.avatar;

}


/*
 * ============================================================
 * TEAM NAME
 * ============================================================
 */

export const getTeamNameFromTeamManagers = (
    teamManagers,
    rosterID,
    year
) => {

    if(
        !year ||
        year > teamManagers.currentSeason
    ) {

        year =
            teamManagers.currentSeason;

    }


    return teamManagers
        .teamManagersMap
        [year]
        [rosterID]
        .team
        .name;

}


/*
 * ============================================================
 * RENDER MANAGER NAMES
 * ============================================================
 */

export const renderManagerNames = (
    teamManagers,
    rosterID,
    year
) => {

    if(
        !year ||
        year > teamManagers.currentSeason
    ) {

        year =
            teamManagers.currentSeason;

    }


    let managersString = "";


    for(
        const managerID
        of teamManagers
            .teamManagersMap
            [year]
            [rosterID]
            .managers
    ) {

        const manager =
            teamManagers
                .users[
                    managerID
                ];


        if(manager) {

            if(
                managersString != ""
            ) {

                managersString += ", ";

            }


            managersString +=
                manager.display_name;

        }

    }


    return managersString;

}


/*
 * ============================================================
 * GET TEAM
 * ============================================================
 */

export const getTeamFromTeamManagers = (
    teamManagers,
    rosterID,
    year
) => {

    if(
        !year ||
        year > teamManagers.currentSeason
    ) {

        year =
            teamManagers.currentSeason;

    }


    return teamManagers
        .teamManagersMap
        [year]
        [rosterID]
        ['team'];

}


/*
 * ============================================================
 * NESTED TEAM NAMES
 * ============================================================
 */

export const getNestedTeamNamesFromTeamManagers = (
    teamManagers,
    year,
    rosterID
) => {

    const originalName =
        teamManagers
            .teamManagersMap
            [year]
            [rosterID]
            ['team']
            ['name'];


    const currentName =
        teamManagers
            .teamManagersMap
            [teamManagers.currentSeason]
            [rosterID]
            ['team']
            ['name'];


    if(
        cleanName(originalName) !=
        cleanName(currentName)
    ) {

        return `${originalName}<div class="curOwner">(${currentName})</div>`;

    }


    return originalName;

}


/*
 * ============================================================
 * DATES ACTIVE
 * ============================================================
 */

export const getDatesActive = (
    teamManagers,
    managerID
) => {

    if (
        !teamManagers ||
        !managerID ||
        !teamManagers.teamManagersMap
    ) {
        return {
            start: null,
            end: null
        };
    }


    const targetManagerID =
        String(managerID);


    const datesActive = {

        start: null,

        end: null

    };


    const years =
        Object.keys(
            teamManagers.teamManagersMap
        ).sort(
            (a, b) => b - a
        );


    for (
        const year of years
    ) {

        const yearManagers =
            teamManagers.teamManagersMap[year];


        if (!yearManagers) {
            continue;
        }


        for (
            const rosterID in yearManagers
        ) {

            const managers =
                yearManagers[
                    rosterID
                ]?.managers || [];


            const managerFound =
                managers.some(
                    id =>
                        String(id) ===
                        targetManagerID
                );


            if (managerFound) {

                datesActive.start =
                    Number(year);


                if (
                    !datesActive.end
                ) {

                    datesActive.end =
                        Number(year);

                }


                break;

            }

        }

    }


    /*
     * If the manager is active in the
     * current season, there is no end date.
     */

    if (
        datesActive.end ===
        teamManagers.currentSeason
    ) {

        datesActive.end =
            null;

    }


    return datesActive;

};


/*
 * ============================================================
 * GET ROSTER ID FROM MANAGER ID
 * ============================================================
 */

export const getRosterIDFromManagerID = (
    teamManagers,
    managerID
) => {

    if (
        !teamManagers ||
        !managerID ||
        !teamManagers.teamManagersMap
    ) {
        return null;
    }


    const targetManagerID =
        String(managerID);


    const years =
        Object.keys(
            teamManagers.teamManagersMap
        ).sort(
            (a, b) => b - a
        );


    for (
        const year of years
    ) {

        const yearManagers =
            teamManagers.teamManagersMap[year];


        if (!yearManagers) {
            continue;
        }


        for (
            const rosterID in yearManagers
        ) {

            const roster =
                yearManagers[rosterID];


            const managers =
                roster?.managers || [];


            /*
             * Compare IDs as strings.
             *
             * Sleeper data can sometimes give us
             * an ID as a number while our custom
             * manager profile uses a string.
             */

            const managerFound =
                managers.some(
                    id =>
                        String(id) ===
                        targetManagerID
                );


            if (managerFound) {

                return {

                    rosterID:
                        String(rosterID),

                    year:
                        Number(year)

                };

            }

        }

    }


    return null;

};


/*
 * ============================================================
 * GET ROSTER ID FROM MANAGER ID AND YEAR
 * ============================================================
 */

export const getRosterIDFromManagerIDAndYear = (
    teamManagers,
    managerID,
    year
) => {

    if(
        !managerID ||
        !year
    ) {

        return null;

    }


    for(
        const rosterID
        in teamManagers
            .teamManagersMap
            [year]
    ) {

        if(
            teamManagers
                .teamManagersMap
                [year]
                [rosterID]
                .managers
                .indexOf(
                    managerID
                ) > -1
        ) {

            return rosterID;

        }

    }


    return null;

}


/*
 * ============================================================
 * CHECK MANAGER AWARD
 * ============================================================
 */

export const checkIfManagerReceivedAward = (
    teamManagers,
    awardRosterID,
    year,
    managerID
) => {

    if(!managerID) {
        return false;
    }


    return teamManagers
        .teamManagersMap
        [year]
        [awardRosterID]
        .managers
        .indexOf(
            managerID
        ) > -1;

}
