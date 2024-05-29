<script lang="ts">
    import Paragraph from '$lib/components/strapi/Paragraph.svelte';
    import type {IImageWithTextComponent} from '$lib';
    import Image from '$lib/components/strapi/Image.svelte';

    export let data: IImageWithTextComponent;

    $: imageComponent = data.imageComponent;
    $: imageAlign = data.imageAlign;
    $: paragraphGroup = data.paragraphGroup;
</script>

<div class="grid md:grid-cols-2 gap-6">
    <div class="w-full shrink-0" class:order-last={imageAlign === 'right'}>
        <Image data={imageComponent} />
    </div>
    <div class="flex flex-col gap-6">
        {#each paragraphGroup as paragraph}
            <Paragraph paragraph={paragraph} />
        {/each}
    </div>
</div>
