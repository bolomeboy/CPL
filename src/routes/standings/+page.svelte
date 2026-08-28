<script>
	import { Standings } from '$lib/components';
	import { page } from '$app/stores';

	/*
	 * Read the division directly from the URL.
	 *
	 * This updates automatically when the Red/Green
	 * button changes the query string.
	 */

	$: division =
		$page.url.searchParams.get('division') === 'green'
			? 'green'
			: 'red';


	/*
	 * The route's load function provides the correct
	 * standings data for the selected division.
	 */

	$: standingsData = $page.data.standingsData;
	$: leagueTeamManagersData = $page.data.leagueTeamManagersData;

</script>


<style>

	.holder {
		position: relative;
		z-index: 1;
		text-align: center;
		width: 100%;
	}


	/*
	 * ============================================================
	 * TITLE
	 * ============================================================
	 */

	h1 {
		text-align: center;
		margin: 25px 0 10px;
		font-size: 1.8em;
	}


	/*
	 * ============================================================
	 * RED / GREEN BUTTONS
	 * ============================================================
	 */

	.divisionButtons {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin: 15px 0 30px;
		position: relative;
		z-index: 100;
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


	.divisionButtons a.active {
		background-color: var(--blueOne);
		color: #fff;
		border-color: var(--blueOne);
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


	<!-- ========================================================
	     TITLE
	     ======================================================== -->

	<h1>

		{division === 'green'
			? 'CPL Green Standings'
			: 'CPL Red Standings'}

	</h1>


	<!-- ========================================================
	     RED / GREEN SWITCHER
	     ======================================================== -->

	<div class="divisionButtons">

		<a
			href="/standings?division=red"
			class:active={division === 'red'}
		>
			🔴 CPL Red
		</a>


		<a
			href="/standings?division=green"
			class:active={division === 'green'}
		>
			🟢 CPL Green
		</a>

	</div>


	<!-- ========================================================
	     STANDINGS
	     ======================================================== -->

	<Standings
		{standingsData}
		{leagueTeamManagersData}
		{division}
	/>

</div>
