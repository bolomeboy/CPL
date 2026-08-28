<script>
	import LinearProgress from '@smui/linear-progress';
	import { Rosters } from '$lib/components';
	import { page } from '$app/stores';


	/*
	 * ============================================================
	 * CURRENT CPL DIVISION
	 * ============================================================
	 *
	 * /rosters?division=red
	 * /rosters?division=green
	 */

	$: division =
		$page.url.searchParams.get('division') === 'green'
			? 'green'
			: 'red';


	/*
	 * ============================================================
	 * PAGE DATA
	 * ============================================================
	 */

	export let data;

	$: rostersInfo = data.rostersInfo;

</script>


<style>

	.holder {
		position: relative;
		z-index: 1;
		width: 100%;
	}


	/*
	 * ============================================================
	 * PAGE TITLE
	 * ============================================================
	 */

	h1 {
		text-align: center;
		margin: 25px 0 10px;
		font-size: 1.8em;
	}


	/*
	 * ============================================================
	 * RED / GREEN SWITCHER
	 * ============================================================
	 */

	.divisionButtons {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin: 15px 0 30px;
		position: relative;
		z-index: 10;
	}


	.divisionButtons a {
		display: inline-block;
		padding: 9px 18px;
		border: 1px solid var(--ccc);
		border-radius: 20px;
		text-decoration: none;
		color: inherit;
		background-color: var(--fff);
		font-size: 0.95em;
		font-weight: 600;
		cursor: pointer;

		transition:
			background-color 0.15s ease,
			transform 0.15s ease;
	}


	.divisionButtons a:hover {
		background-color: var(--eee);
		transform: translateY(-1px);
	}


	/*
	 * Highlight the division currently being viewed.
	 */

	.divisionButtons a.active {
		background-color: var(--blueOne);
		color: #fff;
		border-color: var(--blueOne);
	}


	/*
	 * ============================================================
	 * LOADING
	 * ============================================================
	 */

	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}


	/*
	 * ============================================================
	 * MOBILE
	 * ============================================================
	 */

	@media (max-width: 500px) {

		h1 {
			font-size: 1.5em;
			margin-top: 20px;
		}


		.divisionButtons {
			margin-bottom: 25px;
		}


		.divisionButtons a {
			padding: 8px 14px;
			font-size: 0.85em;
		}

	}

</style>


<div class="holder">


	<!--
		============================================================
		TITLE
		============================================================
	-->

	<h1>

		{division === 'green'
			? 'CPL Green Rosters'
			: 'CPL Red Rosters'}

	</h1>


	<!--
		============================================================
		RED / GREEN SWITCHER
		============================================================
	-->

	<div class="divisionButtons">

		<a
			href="/rosters?division=red"
			class:active={division === 'red'}
		>

			🔴 CPL Red

		</a>


		<a
			href="/rosters?division=green"
			class:active={division === 'green'}
		>

			🟢 CPL Green

		</a>

	</div>


	<!--
		============================================================
		ROSTERS
		============================================================
		*
		* Recreate the roster component when switching between
		* CPL Red and CPL Green so the old league data cannot
		* remain on screen.
		-->

	{#key division}

		{#await rostersInfo}

			<div class="loading">

				<p>
					Retrieving
					{division === 'green'
						? 'CPL Green'
						: 'CPL Red'}
					roster data...
				</p>

				<br />

				<LinearProgress indeterminate />

			</div>


		{:then [leagueData, rosterData, leagueTeamManagers, playersInfo]}

			<!--
				====================================================
				ROSTER DATA
				====================================================
			-->

			<Rosters
				{leagueData}
				{rosterData}
				{leagueTeamManagers}
				{playersInfo}
			/>


		{:catch error}

			<p style="text-align: center;">

				Something went wrong:
				{error.message}

			</p>

		{/await}

	{/key}

</div>
