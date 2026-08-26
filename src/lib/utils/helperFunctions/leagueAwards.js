import { getLeagueData } from './leagueData';
import { getLeagueRosters } from './leagueRosters';
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import { awards } from '$lib/stores';
import { leagueID } from '$lib/utils/leagueInfo';

export const getAwards = async (queryLeagueID = leagueID) => {

	// Only use the existing global cache for the original league.
	if (queryLeagueID === leagueID && get(awards).length) {
		return get(awards);
	}

	const leagueData = await getLeagueData(queryLeagueID).catch((err) => {
		console.error(err);
	});

	let previousSeasonID =
		leagueData.status == "complete"
			? leagueData.league_id
			: leagueData.previous_league_id;

	const podiums = await getPodiums(previousSeasonID);

	// Only update the global awards store for the original league.
	if (queryLeagueID === leagueID) {
		awards.update(() => podiums);
	}

	return podiums;
};


const getPodiums = async (previousSeasonID) => {

	const podiums = [];

	while (previousSeasonID && previousSeasonID != 0) {

		// Get the previous season's data.
		const previousSeasonData =
			await getPreviousLeagueData(previousSeasonID);

		const {
			losersData,
			winnersData,
			year,
			previousRosters,
			numDivisions,
			playoffRounds,
			toiletRounds,
			leagueMetadata
		} = previousSeasonData;

		previousSeasonID = previousSeasonData.previousSeasonID;

		const divisions = buildDivisionsAndManagers({
			previousRosters,
			leagueMetadata,
			numDivisions
		});

		// Add manager to division object and convert to array.
		const divisionArr = [];

		for (const key in divisions) {
			divisionArr.push(divisions[key]);
		}

		// Make sure there are playoff results before trying to read them.
		if (!winnersData || !winnersData.length) {
			continue;
		}

		const finalsMatches = winnersData.filter(
			m => m.r == playoffRounds && m.t1_from?.w
		);

		if (!finalsMatches.length) {
			continue;
		}

		const finalsMatch = finalsMatches[0];

		const champion = finalsMatch.w;
		const second = finalsMatch.l;

		const runnersUpMatches = winnersData.filter(
			m => m.r == playoffRounds && m.t1_from?.l
		);

		const third =
			runnersUpMatches.length
				? runnersUpMatches[0].w
				: null;

		let toilet = null;

		if (losersData && losersData.length) {

			const toiletBowlMatches = losersData.filter(
				m => m.r == toiletRounds &&
					(!m.t1_from || m.t1_from.w)
			);

			if (toiletBowlMatches.length) {
				toilet = toiletBowlMatches[0].w;
			}
		}

		if (!champion) {
			continue;
		}

		const podium = {
			year,
			champion,
			second,
			third,
			divisions: divisionArr,
			toilet
		};

		podiums.push(podium);
	}

	return podiums;
};


// Fetch the previous season's data from Sleeper.
const getPreviousLeagueData = async (previousSeasonID) => {

	const resPromises = [

		fetch(
			`https://api.sleeper.app/v1/league/${previousSeasonID}`,
			{ compress: true }
		),

		getLeagueRosters(previousSeasonID),

		fetch(
			`https://api.sleeper.app/v1/league/${previousSeasonID}/losers_bracket`,
			{ compress: true }
		),

		fetch(
			`https://api.sleeper.app/v1/league/${previousSeasonID}/winners_bracket`,
			{ compress: true }
		),
	];

	const [
		leagueRes,
		rostersData,
		losersRes,
		winnersRes
	] = await waitForAll(...resPromises).catch((err) => {
		console.error(err);
	});

	if (
		!leagueRes?.ok ||
		!losersRes?.ok ||
		!winnersRes?.ok
	) {
		throw new Error(
			`Unable to retrieve previous league data for ${previousSeasonID}`
		);
	}

	const jsonPromises = [
		leagueRes.json(),
		losersRes.json(),
		winnersRes.json(),
	];

	const [
		prevLeagueData,
		losersData,
		winnersData
	] = await waitForAll(...jsonPromises).catch((err) => {
		console.error(err);
	});

	const year = prevLeagueData.season;

	const previousRosters = rostersData.rosters;

	const numDivisions =
		prevLeagueData.settings.divisions || 1;

	const nextPreviousSeasonID =
		prevLeagueData.previous_league_id;

	const playoffRounds =
		winnersData && winnersData.length
			? winnersData[winnersData.length - 1].r
			: 0;

	const toiletRounds =
		losersData && losersData.length
			? losersData[losersData.length - 1].r
			: 0;

	return {
		losersData,
		winnersData,
		year,
		previousRosters,
		numDivisions,
		previousSeasonID: nextPreviousSeasonID,
		playoffRounds,
		toiletRounds,
		leagueMetadata: prevLeagueData.metadata
	};
};


// Determine division champions and construct previousManagers object.
const buildDivisionsAndManagers = ({
	previousRosters,
	leagueMetadata,
	numDivisions
}) => {

	const divisions = {};

	for (let i = 1; i <= numDivisions; i++) {

		divisions[i] = {
			name: leagueMetadata
				? leagueMetadata[`division_${i}`]
				: null,
			wins: -1,
			points: -1
		};
	}

	for (const rosterID in previousRosters) {

		const rSettings =
			previousRosters[rosterID].settings;

		const div =
			!rSettings.division ||
			rSettings.division > numDivisions
				? 1
				: rSettings.division;

		const points =
			rSettings.fpts +
			rSettings.fpts_decimal / 100;

		if (
			rSettings.wins > divisions[div].wins ||
			(
				rSettings.wins == divisions[div].wins &&
				points == divisions[div].points
			)
		) {

			divisions[div].points = points;
			divisions[div].wins = rSettings.wins;
			divisions[div].rosterID = rosterID;
		}
	}

	return divisions;
};