import { managers as managersObj } from '$lib/utils/leagueInfo';
import { goto } from "$app/navigation";
import { stringDate } from './news';

const QUESTION = 'managers/question.jpg';

export const cleanName = (name) => {
    return name.replace('Team ', '').toLowerCase().replace(/[ ’'!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "")
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
        while(minAnswer > 0 && (num - minAnswer) / (max - minAnswer) < .15) {
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
 * This is used throughout the site:
 *
 * Standings
 * Rosters
 * Transactions
 * Records
 * Awards
 * etc.
 *
 * If a roster is clicked, find the manager attached to that
 * roster and determine the manager's Red/Green division from
 * the custom manager profile list.
 */

export const gotoManager = ({
    leagueTeamManagers,
    managerID,
    rosterID,
    year,
    division = null
}) => {

    if (!leagueTeamManagers) {
        goto('/managers');
        return;
    }


    /*
     * Use the current season when no year was supplied.
     */
    if (!year || year > leagueTeamManagers.currentSeason) {
        year = leagueTeamManagers.currentSeason;
    }


    const yearManagers =
        leagueTeamManagers.teamManagersMap?.[year];


    if (!yearManagers) {
        goto('/managers');
        return;
    }


    let selectedManagerID =
        managerID
            ? String(managerID)
            : null;


    let selectedRosterID =
        rosterID
            ? String(rosterID)
            : null;


    /*
     * If a manager ID was supplied, find the roster
     * that belongs to that manager.
     */
    if (selectedManagerID) {

        for (const rID in yearManagers) {

            const rosterData =
                yearManagers[rID];


            if (!rosterData?.managers) {
                continue;
            }


            if (
                rosterData.managers
                    .map(String)
                    .includes(selectedManagerID)
            ) {

                selectedRosterID =
                    String(rID);

                break;

            }

        }

    }


    /*
     * If only a roster was supplied, find the manager
     * attached to that roster.
     */
    if (
        !selectedManagerID &&
        selectedRosterID &&
        yearManagers[selectedRosterID]
    ) {

        const rosterData =
            yearManagers[selectedRosterID];


        if (
            rosterData?.managers &&
            rosterData.managers.length
        ) {

            selectedManagerID =
                String(
                    rosterData.managers[0]
                );

        }

    }


    /*
     * If we still don't have a manager, there is nowhere
     * specific to navigate.
     */
    if (!selectedManagerID) {

        const fallbackDivision =
            division || 'red';

        goto(
            `/managers?division=${encodeURIComponent(
                fallbackDivision
            )}`
        );

        return;

    }


    /*
     * ============================================================
     * DETERMINE RED / GREEN
     * ============================================================
     *
     * First use an explicitly supplied division.
     *
     * Otherwise look at the custom manager profile.
     *
     * This is what allows Standings, Rosters, Transactions,
     * Records, etc. to correctly open a Green manager instead
     * of defaulting back to Red.
     */

    let currentDivision =
        division;


    if (!currentDivision) {

        const managerProfile =
            managersObj?.find(
                manager =>
                    String(manager.managerID) ===
                    String(selectedManagerID)
            );


        if (
            managerProfile?.division ===
            'green'
        ) {

            currentDivision =
                'green';

        } else {

            currentDivision =
                'red';

        }

    }


    /*
     * ============================================================
     * MANAGER URL
     * ============================================================
     */

    goto(
        `/manager?managerID=${encodeURIComponent(
            selectedManagerID
        )}` +
        `&division=${encodeURIComponent(
            currentDivision
        )}` +
        `&year=${encodeURIComponent(
            year
        )}` +
        `&rosterID=${encodeURIComponent(
            selectedRosterID || ''
        )}`
    );

};


export const getAuthor = (leagueTeamManagers, author) => {

    for(const userID in leagueTeamManagers.users) {

        if(
            leagueTeamManagers.users[userID].user_name
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
        .teamManagersMap[year]
        [rosterID]
        .team
        .name;

}


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
        const managerID of
        teamManagers
            .teamManagersMap
            [year]
            [rosterID]
            .managers
    ) {

        const manager =
            teamManagers.users[managerID];


        if(manager) {

            if(managersString != "") {
                managersString += ", "
            }

            managersString +=
                manager.display_name;

        }

    }

    return managersString;

}


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


export const getDatesActive = (
    teamManagers,
    managerID
) => {

    if(!managerID) return;


    let datesActive = {
        start: null,
        end: null
    };


    const years =
        Object.keys(
            teamManagers.teamManagersMap
        ).sort(
            (a, b) => b - a
        );


    for(const year of years) {

        for(
            const rosterID in
            teamManagers.teamManagersMap[year]
        ) {

            if(
                teamManagers
                    .teamManagersMap
                    [year]
                    [rosterID]
                    .managers
                    .indexOf(managerID) > -1
            ) {

                datesActive.start =
                    year;


                if(!datesActive.end) {

                    datesActive.end =
                        year;

                }

                break;

            }

        }

    }


    if(
        datesActive.end ==
        teamManagers.currentSeason
    ) {

        datesActive.end =
            null;

    }


    return datesActive;

}


export const getRosterIDFromManagerID = (
    teamManagers,
    managerID
) => {

    if(!managerID) return null;


    const years =
        Object.keys(
            teamManagers.teamManagersMap
        ).sort(
            (a, b) => b - a
        );


    for(const year of years) {

        for(
            const rosterID in
            teamManagers.teamManagersMap[year]
        ) {

            if(
                teamManagers
                    .teamManagersMap
                    [year]
                    [rosterID]
                    .managers
                    .indexOf(managerID) > -1
            ) {

                return {
                    rosterID,
                    year
                };

            }

        }

    }


    return null;

}


export const getRosterIDFromManagerIDAndYear = (
    teamManagers,
    managerID,
    year
) => {

    if(!managerID || !year)
        return null;


    for(
        const rosterID in
        teamManagers.teamManagersMap[year]
    ) {

        if(
            teamManagers
                .teamManagersMap
                [year]
                [rosterID]
                .managers
                .indexOf(managerID) > -1
        ) {

            return rosterID;

        }

    }


    return null;

}


export const checkIfManagerReceivedAward = (
    teamManagers,
    awardRosterID,
    year,
    managerID
) => {

    if(!managerID)
        return false;


    return teamManagers
        .teamManagersMap
        [year]
        [awardRosterID]
        .managers
        .indexOf(managerID) > -1;

}
