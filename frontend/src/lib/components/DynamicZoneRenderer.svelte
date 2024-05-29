<script lang="ts">
    import { onMount } from 'svelte';
    import Title from '$lib/components/strapi/Title.svelte';
    import Text from '$lib/components/strapi/Text.svelte';
    import StrongText from '$lib/components/strapi/StrongText.svelte';
    import Blockquote from '$lib/components/strapi/Blockquote.svelte';
    import Images from '$lib/components/strapi/Images.svelte';
    import Image from '$lib/components/strapi/Image.svelte';
    import ImageWithText from '$lib/components/strapi/ImageWithText.svelte';
    import Paragraph from '$lib/components/strapi/Paragraph.svelte';
    import Video from '$lib/components/strapi/Video.svelte';
    import Slider from '$lib/components/strapi/Slider.svelte';
    import type {IDynamicZoneComponent} from '$lib';

    export let content: IDynamicZoneComponent;

    $: Component = null;

    onMount(() => {
        Component = getComponent();
    });

    function getComponent() {
        switch (content.__component) {
            case 'typography.title':
                return Title;
            case 'typography.paragraph':
                return Paragraph;
            case 'typography.strong-text':
                return StrongText;
            case 'typography.blockquote':
                return Blockquote;
            case 'media.image':
                return Image;
            case 'media.video':
                return Video;
            case 'media.slider':
                return Slider;
            case 'blocks.text':
                return Text;
            case 'blocks.images':
                return Images;
            case 'blocks.image-with-text':
                return ImageWithText;
            default:
                return null;
        }
    }
</script>

{#if Component}
    <svelte:component this={Component} data={content}/>
{/if}



