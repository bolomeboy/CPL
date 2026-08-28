<script>
	import { tabs } from '$lib/utils/tabs';

	import Drawer, {
		Content,
		Header,
		Title,
	} from '@smui/drawer';

	import { Icon } from '@smui/tab';

	import List, {
		Item,
		Text,
		Graphic,
		Separator,
		Subheader
	} from '@smui/list';

	import { goto, preloadData } from '$app/navigation';
	import { page } from '$app/state';

	import { leagueName } from '$lib/utils/helper';
	import { enableBlog, managers } from '$lib/utils/leagueInfo';


	let active = $state(page.url.pathname);

	let open = $state(false);


	const selectTab = (tab) => {

		open = false;

		goto(tab.dest);

	};


	// Tabs that should appear underneath League Info
	const leagueInfoTabs = [
		'Promotion & Relegation',
		'League Rules'
	];

</script>


<style>

	/*
	 * ============================================================
	 * MOBILE MENU ICON
	 * ============================================================
	 */

	:global(.menuIcon) {

		position: fixed;

		top: 15px;

		left: 15px;

		font-size: 2em;

		color: #888;

		padding: 6px;

		cursor: pointer;

		/*
		 * Extremely high so team logos/charts
		 * cannot cover the hamburger.
		 */
		z-index: 999999 !important;

	}


	:global(.menuIcon:hover) {

		color: #00316b;

	}


	/*
	 * ============================================================
	 * SMUI DRAWER
	 * ============================================================
	 */

	:global(.nav-drawer) {

		position: fixed !important;

		top: 0 !important;

		left: 0 !important;

		z-index: 1000000 !important;

	}


	/*
	 * Make sure the actual drawer content
	 * also sits above page content.
	 */

	:global(.nav-drawer .mdc-drawer) {

		z-index: 1000000 !important;

	}


	:global(.nav-drawer .mdc-drawer__content) {

		z-index: 1000001 !important;

	}


	/*
	 * ============================================================
	 * DRAWER SCRIM
	 * ============================================================
	 */

	:global(.mdc-drawer-scrim) {

		z-index: 999998 !important;

	}


	/*
	 * ============================================================
	 * NORMAL NAVIGATION ITEMS
	 * ============================================================
	 */

	:global(.nav-item) {

		color: #858585 !important;

	}


	/*
	 * ============================================================
	 * BACKGROUND OVERLAY
	 * ============================================================
	 */

	.nav-back {

		position: fixed;

		top: 0;

		left: 0;

		width: 100vw;

		height: 100vh;

		/*
		 * Above the website content.
		 */
		z-index: 999997;

		background-color:
			rgba(0, 0, 0, 0.32);

		transition: all 0.7s;

	}

</style>


<!--
	============================================================
	MOBILE HAMBURGER
	============================================================
-->

<Icon
	class="material-icons menuIcon"

	onclick={() => open = true}

	ripple={false}

	touch={true}
>
	menu
</Icon>


<!--
	============================================================
	BACKGROUND OVERLAY
	============================================================
-->

<div
	class="nav-back"

	style="
		pointer-events:
			{open ? 'auto' : 'none'};

		opacity:
			{open ? 1 : 0};
	"

	onclick={() => open = false}
></div>


<!--
	============================================================
	MOBILE DRAWER
	============================================================
-->

<Drawer
	variant="modal"
	class="nav-drawer"
	fixed={true}
	bind:open
>

	<Header>

		<Title>
			{leagueName}
		</Title>

	</Header>


	<Content>

		<List>


			<!--
				================================================
				MAIN NAVIGATION
				================================================
			-->

			{#each tabs as tab}

				{#if !tab.nest &&
					(
						tab.label != 'Blog' ||
						(
							tab.label == 'Blog' &&
							enableBlog
						)
					) &&
					!leagueInfoTabs.includes(tab.label)
				}

					<Item
						href="javascript:void(0)"

						onSMUIAction={() =>
							selectTab(tab)
						}

						ontouchstart={() =>
							preloadData(tab.dest)
						}

						onmouseover={() =>
							preloadData(tab.dest)
						}

						activated={
							active == tab.dest
						}
					>

						<Graphic
							class="material-icons{
								active == tab.dest
									? ''
									: ' nav-item'
							}"

							aria-hidden="true"
						>

							{tab.icon}

						</Graphic>


						<Text
							class={
								active == tab.dest
									? ''
									: 'nav-item'
							}
						>

							{tab.label}

						</Text>

					</Item>

				{/if}

			{/each}


			<!--
				================================================
				LEAGUE INFO
				================================================
			-->

			<Separator />

			<Subheader>
				League Info
			</Subheader>


			{#each tabs as tab}

				{#if leagueInfoTabs.includes(tab.label)}

					<Item
						href="javascript:void(0)"

						onSMUIAction={() =>
							selectTab(tab)
						}

						ontouchstart={() =>
							preloadData(tab.dest)
						}

						onmouseover={() =>
							preloadData(tab.dest)
						}

						activated={
							active == tab.dest
						}
					>

						<Graphic
							class="material-icons{
								active == tab.dest
									? ''
									: ' nav-item'
							}"

							aria-hidden="true"
						>

							{tab.icon}

						</Graphic>


						<Text
							class={
								active == tab.dest
									? ''
									: 'nav-item'
							}
						>

							{tab.label}

						</Text>

					</Item>

				{/if}

			{/each}


		</List>

	</Content>

</Drawer>
