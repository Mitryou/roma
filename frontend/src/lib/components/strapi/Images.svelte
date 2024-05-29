<script lang="ts">
    import type {IImagesComponent} from '$lib';
    import Image from '$lib/components/strapi/Image.svelte';
    import {onMount} from 'svelte';
    import {ImagesLayout} from '$lib';

    export let data: IImagesComponent;

    $: imageGroup = data.imageGroup;
    $: layout = data.layout;

    $: colsNumber = null;

    onMount(() => {
        switch (layout) {
            case ImagesLayout.BY_IMAGES_COUNT:
                colsNumber = imageGroup.length;
                break;
            case ImagesLayout.BY_THREE_COLS:
                colsNumber = 3;
                break;
            default:
                colsNumber = 3;
        }
    });
</script>

<div class="grid md:grid-cols-{`${colsNumber}`} justify-center gap-6">
    {#each imageGroup as image}
        <Image data={image} />
    {/each}
</div>
