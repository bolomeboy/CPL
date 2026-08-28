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

	import {
		enableBlog,
		managers
	} from '$lib/utils/leagueInfo';


	let active = $state(page.url.pathname);

	let open = $state(false);


	const selectTab = (tab) => {

		open = false;

		goto(tab.dest);

	};


	/*
	 * Tabs that should appear underneath
	 * League Info.
	 */
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

		position: absolute;

		top: 15px;

		left: 15px;

		font-size: 2em;

		color: #888;

		padding: 6px;

		cursor: pointer;

		/*
		 * Keep the hamburger above page content.
		 */
		z-index: 10001;

	}


	:global(.menuIcon:hover) {

		color: #00316b;

	}


	/*
	 * ============================================================
	 * MOBILE DRAWER
	 * ============================================================
	 */

	:global(.nav-drawer) {

		/*
		 * Keep the drawer above the page,
		 * Power Rankings, team logos, etc.
		 */
		z-index: 10003;

		top: 0;

		left: 0;

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

		/*
		 * Above page content but below
		 * the actual drawer.
		 */
		z-index: 10002;

		width: 100vw;

		height: 100vh;

		top: 0;

		left: 0;

		background-color:
			rgba(0, 0, 0, 0.32);

		transition: all 0.7s;

	}

</style>


<!--
	============================================================
	MOBILE HAMBURGER BUTTON
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
			{open ? 'visible' : 'none'};

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
					!leagueInfoTabs.includes(
						tab.label
					)
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

				{#if leagueInfoTabs.includes(
					tab.label
				)}

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
