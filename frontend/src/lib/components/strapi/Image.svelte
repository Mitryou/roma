<script lang="ts">
    import {BACKEND_URL} from '../../../config';
    import type {TImage} from '$lib';

    export let data: TImage;
    export let withCaption: boolean = true;

    $: caption = data.caption;
    $: sourceLink = data.sourceLink;
    $: sourceText = data.sourceText;
    $: image = data.image;
</script>

<figure class="w-full h-full flex flex-col justify-between">
    <img src={`${BACKEND_URL}${image.data.attributes.url}`} alt="">
    {#if withCaption}
        <figcaption class="py-1.5 self-start">
            {#if caption}
                <p class="text-sm">{caption}</p>
            {/if}

            {#if sourceLink}
                <a href={sourceLink} target="_blank" class="text-xs text-grey hover:text-iron">{sourceText ?? sourceLink}</a>
            {:else if sourceText}
                <p class="text-xs text-grey">{sourceText}</p>
            {/if}
        </figcaption>
    {/if}
</figure>
