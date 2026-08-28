<script>
	import { Standings } from '$lib/components';
	import { goto } from '$app/navigation';

	export let data;

	const {
		standingsData,
		leagueTeamManagersData,
		division
	} = data;


	function switchDivision(newDivision) {
		goto(`/standings?division=${newDivision}`);
	}
</script>


<style>
	.holder {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.divisionSwitcher {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin: 20px auto 25px;
		flex-wrap: wrap;
		position: relative;
		z-index: 100;
	}

	.divisionButton {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		padding: 10px 22px;

		border: 1px solid var(--ccc);
		border-radius: 25px;

		background-color: var(--f3f3f3);
		color: inherit;

		font-size: 1em;
		font-weight: 600;

		cursor: pointer;

		transition:
			background-color 0.15s ease,
			transform 0.15s ease;
	}

	.divisionButton:hover {
		transform: translateY(-1px);
		background-color: var(--eee);
	}

	.divisionButton.active {
		background-color: var(--blueOne);
		color: #fff;
		border-color: var(--blueOne);
	}

	.dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		display: inline-block;
		margin-right: 8px;
	}

	.redDot {
		background-color: #d00000;
	}

	.greenDot {
		background-color: #00a000;
	}

	@media (max-width: 500px) {
		.divisionSwitcher {
			margin: 15px auto 20px;
		}

		.divisionButton {
			padding: 8px 16px;
			font-size: 0.9em;
		}
	}
</style>


<div class="holder">

	<div class="divisionSwitcher">

		<button
			type="button"
			class="divisionButton {division === 'red' ? 'active' : ''}"
			onclick={() => switchDivision('red')}
		>
			<span class="dot redDot"></span>
			CPL Red
		</button>


		<button
			type="button"
			class="divisionButton {division === 'green' ? 'active' : ''}"
			onclick={() => switchDivision('green')}
		>
			<span class="dot greenDot"></span>
			CPL Green
		</button>

	</div>


	<Standings
		{standingsData}
		{leagueTeamManagersData}
	/>

</div>