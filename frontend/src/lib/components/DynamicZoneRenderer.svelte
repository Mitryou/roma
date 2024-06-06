<script lang="ts">
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
    import RelatedMaterial from '$lib/components/strapi/RelatedMaterial.svelte';

    export let content: any; // TODO set correct type

    const components = {
        'typography.title': Title,
        'typography.paragraph': Paragraph,
        'typography.strong-text': StrongText,
        'typography.blockquote': Blockquote,
        'media.image': Image,
        'media.video': Video,
        'media.slider': Slider,
        'blocks.text': Text,
        'blocks.images': Images,
        'blocks.image-with-text': ImageWithText,
        'blocks.related-material': RelatedMaterial,
    };
</script>

<svelte:component this={components[content.__component]} data={content}/>



