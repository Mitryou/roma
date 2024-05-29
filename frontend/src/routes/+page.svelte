<script lang="ts">
    import emblaCarouselSvelte from 'embla-carousel-svelte'
    import Autoplay from 'embla-carousel-autoplay'
    import PostCardList from '$lib/components/PostCardList.svelte';
    import PersonCard from '$lib/components/PersonCard.svelte';

    let options = {loop: false}
    let plugins = [Autoplay()]

    export let data: any;

    $: posts = data.posts;
    $: persons = data.persons;
</script>

<div class="w-full h-full fixed left-0 top-0 z-10 pointer-events-none">
    <div class="container mx-auto h-full">
        <div class="w-full h-full flex flex-row justify-between">
            <div class="w-[1px] h-full border-l border-current opacity-10"></div>
            <div class="w-[1px] h-full border-l border-current opacity-10"></div>
            <div class="hidden md:block w-[1px] h-full border-l border-current opacity-10"></div>
            <div class="hidden lg:block w-[1px] h-full border-l border-current opacity-10"></div>
            <div class="hidden lg:block w-[1px] h-full border-l border-current opacity-10"></div>
        </div>
    </div>
</div>

<main class="overflow-hidden">
    <section class="main-screen">
        <div class="container mx-auto h-full">
            <div class="flex flex-col justify-center items-start gap-10 lg:gap40 h-full py-10">
                <h1 class="main-screen__title">
                    <span>ГЕНОЦИД РОМА ВО ВРЕМЯ</span>
                    <span>ВТОРОЙ МИРОВОЙ ВОЙНЫ</span>
                    <span>В БЕЛАРУСИ</span>
                </h1>
                <div class="flex-1 flex items-end w-full md:w-3/4 lg:w-1/2 lg:ml-auto ">
                    <div class="border-l-2 border-white pl-2">
                        <p class="text-white text-xs md:text-sm font-normal mb-4">Геноцид в отношении народа рома долгое время оставался неизвестной
                            страницей нашей истории. Благодаря инициативе Белорусской ромской диаспоры данная тема стала
                            известна широкой аудитории. С помощью архивных материалов и интервью со свидетелями мы получили
                            представления о масштабах и форме геноцида.</p>
                        <p class="text-white text-xs sm:text-sm font-normal">Данный сайт содержит наиболее полную информацию о геноциде рома во
                            время Второй мировой войны в Беларуси 1941-1944 гг., включая интервью со свидетелями событий,
                            архивные документы, научную литературу.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-20">
        <div class="container mx-auto">
            <div class="flex flex-col-reverse md:flex-row justify-between gap-y-6">
                <div class="padding">
                    <h2 class="h2 mb-6">Забытый геноцид</h2>
                    <p class="text-xl font-light mb-10">
                        При помощи новых архивных материалов и воспоминаний очевидцев Белорусская ромская диаспора заново открыла историю неизвестного геноцида рома
                    </p>
                    <a href="#" class="link">Читать материал</a>

                </div>
                <div class="w-full md:w-[var(--grid-col-width)] lg:w-[calc(var(--grid-col-width)_*_2)] shrink-0 padding">
                    <img src="./images/history.png" alt="" class="w-full h-full object-cover">
                </div>
            </div>
        </div>
    </section>

    <section class="py-20">
        <div class="container mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mb-6">
                <h2 class="h2 padding">Интервью со свидетелями</h2>
                <a href="/persons" class="link-btn">Смотреть все</a>
            </div>

            {#if persons.length > 0}
                <div use:emblaCarouselSvelte="{{options, plugins}}">
                    <div class="flex">
                        {#each persons as person}
                            <div class="grow-0 shrink-0 w-full md:w-[calc(var(--grid-col-width)_*_1.5)] lg:w-[calc(var(--grid-col-width)_*_2)] padding">
                                <PersonCard person={person} />
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </section>

    <section class="py-20">
        <div class="container mx-auto">
            <div class="flex flex-col gap-10">
                <h2 class="h2 padding mb-6">Карта мест уничтожения рома</h2>
                <a href="/map" class="link-btn">Изучать</a>
            </div>
            <div class="flex justify-center">
                <img src="./images/Belarus.svg" alt="Belarus">
            </div>
        </div>
    </section>

    <section class="py-20">
        <div class="container mx-auto h-full relative">
            <h2 class="h2 padding mb-6">Новости</h2>
            {#if posts.length > 0}
                <PostCardList posts={posts} />
            {/if}
            <div class="flex justify-end">
                <a href="/posts" class="link-btn">Смотреть все</a>
            </div>
        </div>
    </section>
</main>
