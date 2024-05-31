<script lang="ts">
    import type { PageData } from './$types';
    import {onMount} from 'svelte';
    import BlocksRenderer from '$lib/components/DynamicZoneRenderer.svelte';
    import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
    import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
    import {Fa} from 'svelte-fa';

    export let data: PageData;

    $: history = data.history;
    $: chapter = data.chapter;

    $: navList = null;

    $: isMobileNavOpen = true;

    onMount(() => {
        setChaptersNav();
    });

    function setChaptersNav() {
        navList = history.attributes.chapters.data.map(chapter => {
            return {
                id: chapter.id,
                title: chapter.attributes.title,
                link: `/history/${history.attributes.slug}/chapters/${chapter.attributes.slug}`
            }
        });
    }

    function setShowMobileNav() {
        isMobileNavOpen = !isMobileNavOpen;
    }
</script>

<main>
    {#if navList}
        <div class="sticky top-0 left-0 right-0 bg-dark-charcoal">
            <div class="container mx-auto padding py-4">
                <nav class="nav-list">
                    {#each navList as item, index}
                        <a href={item.link} class:text-white={chapter.id === item.id} class="font-semibold hover:text-iron">{index + 1}. {item.title}</a>
                    {/each}
                </nav>

                <button type="button"
                        on:click={setShowMobileNav}
                        class="flex items-center ml-auto gap-3 md:hidden cursor-pointer">
                    <span>Оглавление</span>
                    <Fa icon={faBars} class="text-3xl"/>
                </button>
            </div>
        </div>

        <div class="md:hidden fixed {isMobileNavOpen ? '-top-full' : 'top-0'} left-0 right-0 bottom-0 z-30 w-screen h-screen transition-all duration-200">
            <div class="w-full h-full bg-dark-charcoal p-8">
                <button type="button"
                        on:click={setShowMobileNav}
                        class="mb-8 cursor-pointer">
                    <Fa icon={faXmark}/>
                </button>
                <nav class="nav-list-mobile">
                    {#each navList as item, index}
                        <a href={item.link} class:text-white={chapter.id === item.id} class="font-semibold hover:text-iron" on:click={setShowMobileNav}>{index + 1}. {item.title}</a>
                    {/each}
                </nav>
            </div>
        </div>
    {/if}

    {#if chapter}
        <section class="my-6">
            <div class="container mx-auto padding">
                <div class="flex flex-col gap-6">
                    {#each chapter.attributes.content as content}
                        <BlocksRenderer content={content} />
                    {/each}
                </div>
            </div>
        </section>
    {/if}
</main>


