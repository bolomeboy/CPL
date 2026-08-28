<script>
    import { tabs } from '$lib/utils/tabs';

    import Tab, {
        Icon,
        Label
    } from '@smui/tab';

    import List, {
        Item,
        Graphic,
        Text,
        Separator
    } from '@smui/list';

    import TabBar from '@smui/tab-bar';

    import { page } from '$app/state';

    import {
        goto,
        preloadData
    } from '$app/navigation';

    import {
        enableBlog,
        managers
    } from '$lib/utils/leagueInfo';


    /*
     * ============================================================
     * ACTIVE TAB
     * ============================================================
     */

    let active = $state(
        tabs.find(
            tab =>
                tab.dest == page.url.pathname ||
                (
                    tab.nest &&
                    tab.children.find(
                        subTab =>
                            subTab.dest ==
                            page.url.pathname
                    )
                )
        )
    );


    /*
     * ============================================================
     * MENU STATE
     * ============================================================
     */

    let display = $state(false);


    /*
     * ============================================================
     * MENU POSITION
     * ============================================================
     */

    let el = $state();

    let width = $state();

    let height = $state();

    let left = $state();

    let top = $state();


    $effect(() => {

        const rect =
            el?.getBoundingClientRect();

        top =
            rect
                ? rect.top
                : 0;

        const bottom =
            rect
                ? rect.bottom
                : 0;

        height =
            bottom - top + 1;

        left =
            rect
                ? rect.left
                : 0;

        const right =
            rect
                ? rect.right
                : 0;

        width =
            right - left;

    });


    /*
     * ============================================================
     * WINDOW SIZE
     * ============================================================
     */

    let innerWidth = $state();


    /*
     * ============================================================
     * OPEN / CLOSE SUBMENU
     * ============================================================
     */

    const open = () => {

        display = !display;

    };


    const subGoto = (dest) => {

        display = false;

        goto(dest);

    };


    /*
     * ============================================================
     * FIND NESTED TAB CHILDREN
     * ============================================================
     */

    let tabChildren = $state([]);

    for (const tab of tabs) {

        if (tab.nest) {

            tabChildren =
                tab.children;

        }

    }

</script>


<svelte:window bind:innerWidth={innerWidth} />


<style>

    /*
     * ============================================================
     * MAIN NAVIGATION
     * ============================================================
     */

    :global(.navBar) {

        display: inline-flex;

        position: relative;

        justify-content: center;

        /*
         * Keep navigation above page content.
         */
        z-index: 10001;

    }


    :global(.navBar .material-icons) {

        font-size: 1.8em;

        height: 25px;

        width: 22px;

    }


    /*
     * ============================================================
     * PARENT
     * ============================================================
     */

    .parent {

        position: relative;

        /*
         * Keep the navigation above things such as
         * manager logos and Power Rankings graphics.
         */
        z-index: 10001;

    }


    /*
     * ============================================================
     * SUBMENU
     * ============================================================
     */

    .subMenu {

        overflow-y: hidden;

        display: block;

        position: absolute;

        /*
         * This is intentionally very high so that
         * team/manager images cannot appear over it.
         */
        z-index: 10003;

        background-color: var(--fff);

        transition: all 0.4s;

    }


    /*
     * ============================================================
     * OVERLAY
     * ============================================================
     */

    .overlay {

        display: block;

        position: fixed;

        top: 0;

        left: 0;

        width: 100%;

        height: 100vh;

        /*
         * Overlay sits above page content but
         * below the navigation submenu.
         */
        z-index: 10002;

    }


    /*
     * ============================================================
     * SMUI LIST
     * ============================================================
     */

    :global(.mdc-deprecated-list) {

        padding: 0;

    }


    :global(.subText) {

        font-size: 0.8em;

    }


    :global(.dontDisplay) {

        display: none;

    }

</style>


<!--
    ============================================================
    BACKGROUND OVERLAY
    ============================================================
-->

<div
    tabindex="0"
    role="button"
    class="overlay"

    style="
        display:
            {display ? 'block' : 'none'};
    "

    onclick={() => open(true)}
></div>


<!--
    ============================================================
    DESKTOP NAVIGATION
    ============================================================
-->

<div class="parent">

    <TabBar
        class="navBar"
        {tabs}
        key={(tab) => tab.key}
        bind:active
    >

        {#snippet tab(tab)}

            {#if tab.nest}

                <div bind:this={el}>

                    <Tab
                        {tab}
                        minWidth
                        onclick={() => open()}
                    >

                        <Icon class="material-icons">
                            {tab.icon}
                        </Icon>

                        <Label>
                            {tab.label}
                        </Label>

                    </Tab>

                </div>

            {:else}

                <Tab
                    class={
                        tab.label == 'Blog' &&
                        !enableBlog
                            ? 'dontDisplay'
                            : ''
                    }

                    {tab}

                    onTouchstart={() =>
                        preloadData(tab.dest)
                    }

                    onMouseover={() =>
                        preloadData(tab.dest)
                    }

                    href={tab.dest}

                    minWidth
                >

                    <Icon class="material-icons">
                        {tab.icon}
                    </Icon>

                    <Label>
                        {tab.label}
                    </Label>

                </Tab>

            {/if}

        {/snippet}

    </TabBar>


    <!--
        ========================================================
        DROPDOWN SUBMENU
        ========================================================
    -->

    <div
        class="subMenu"

        style="
            max-height:
                {
                    display
                        ? 49 *
                            tabChildren.length -
                            1 -
                            (
                                managers.length
                                    ? 0
                                    : 48
                            )
                        : 0
                }px;

            width:
                {width}px;

            top:
                {height}px;

            left:
                {left}px;

            box-shadow:
                0 0
                {
                    display
                        ? '3px'
                        : '0'
                }
                0
                #00316b;

            border:
                {
                    display
                        ? '1px'
                        : '0'
                }
                solid
                #00316b;

            border-top:
                none;
        "
    >

        <List>

            {#each tabChildren as subTab, ix}

                <!--
                    ====================================================
                    MANAGERS
                    ====================================================
                -->

                {#if subTab.label == 'Managers'}

                    <Item
                        class={
                            managers.length
                                ? ''
                                : 'dontDisplay'
                        }

                        onSMUIAction={() =>
                            subGoto(subTab.dest)
                        }

                        ontouchstart={() =>
                            preloadData(subTab.dest)
                        }

                        onmouseover={() =>
                            preloadData(subTab.dest)
                        }
                    >

                        <Graphic class="material-icons">

                            {subTab.icon}

                        </Graphic>

                        <Text class="subText">

                            {subTab.label}

                        </Text>

                    </Item>


                    {#if ix != tabChildren.length - 1}

                        <Separator />

                    {/if}


                {:else}


                    <!--
                        ====================================================
                        OTHER SUBMENU ITEMS
                        ====================================================
                    -->

                    <Item
                        onSMUIAction={() =>
                            subGoto(subTab.dest)
                        }

                        ontouchstart={() => {

                            if (
                                subTab.label !=
                                'Go to Sleeper'
                            ) {

                                preloadData(
                                    subTab.dest
                                );

                            }

                        }}

                        onmouseover={() => {

                            if (
                                subTab.label !=
                                'Go to Sleeper'
                            ) {

                                preloadData(
                                    subTab.dest
                                );

                            }

                        }}
                    >

                        <Graphic class="material-icons">

                            {subTab.icon}

                        </Graphic>

                        <Text class="subText">

                            {subTab.label}

                        </Text>

                    </Item>


                    {#if ix != tabChildren.length - 1}

                        <Separator />

                    {/if}

                {/if}

            {/each}

        </List>

    </div>

</div>
