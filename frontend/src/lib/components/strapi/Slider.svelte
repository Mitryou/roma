<script lang="ts">
    import "../../embla.pcss";
    import type { EmblaCarouselType } from 'embla-carousel';
    import emblaCarouselSvelte from 'embla-carousel-svelte'
    import type {ISliderComponent} from '$lib';
    import Image from '$lib/components/strapi/Image.svelte';

    let emblaApi: EmblaCarouselType;
    let options = {}
    let plugins = [];

    export let data: ISliderComponent;

    $: imageGroup = data.imageGroup;

    $: prevBtnDisabled = false;
    $: nextBtnDisabled = false;
    $: snapListLength = 0;
    $: selectedScrollSnap = 0;

    $: activeImage = imageGroup[selectedScrollSnap];

    function onEmblaInit(evt: CustomEvent<any>) {
        emblaApi = evt.detail;
        snapListLength = emblaApi.scrollSnapList().length;

        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }

    function onNextClick() {
        emblaApi.scrollNext();
    }

    function onPrevClick() {
        emblaApi.scrollPrev();
    }

    function onSelect() {
        nextBtnDisabled = !emblaApi.canScrollNext();
        prevBtnDisabled = !emblaApi.canScrollPrev();
        selectedScrollSnap = emblaApi.selectedScrollSnap();
    }
</script>

<div class="embla">
    <div class="embla__viewport"
         use:emblaCarouselSvelte="{{options, plugins}}"
         on:emblaInit={onEmblaInit}>
        <div class="embla__container">
            {#each imageGroup as image}
                <div class="embla__slide">
                    <Image data={image} withCaption={false}/>
                </div>
            {/each}
        </div>
    </div>

    <div class="embla__controls">
        <nav class="embla__buttons">
            <button class="embla__button embla__button--prev"
                    type="button"
                    disabled={prevBtnDisabled}
                    on:click={onPrevClick}>
                <svg class="embla__button__svg" viewBox="0 0 532 532">
                    <path
                            fill="currentColor"
                            d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
                    ></path>
                </svg>
            </button>
            <button class="embla__button embla__button--next"
                    type="button"
                    disabled={nextBtnDisabled}
                    on:click={onNextClick}>
                <svg class="embla__button__svg" viewBox="0 0 532 532">
                    <path
                            fill="currentColor"
                            d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
                    ></path>
                </svg>
            </button>
        </nav>

        <div class="flex flex-row-reverse md:flex-col justify-between items-start md:items-end gap-3 md:gap-0.5">
            <div class="embla__selected-snap-display">{selectedScrollSnap + 1} / {snapListLength}</div>
            <div>
                {#if activeImage.caption}
                    <p class="text-sm">{activeImage.caption}</p>
                {/if}

                {#if activeImage.sourceLink}
                    <a href={activeImage.sourceLink} target="_blank" class="text-xs text-grey hover:text-iron">{activeImage.sourceText ?? activeImage.sourceLink}</a>
                {:else if activeImage.sourceText}
                    <p class="text-xs text-grey">{activeImage.sourceText}</p>
                {/if}
            </div>
        </div>
    </div>
</div>

