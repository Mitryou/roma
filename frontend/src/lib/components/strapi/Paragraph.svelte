<script lang="ts">
    import type {TParagraph} from '$lib';

    export let paragraph: TParagraph;

    $: text = paragraph.text;
</script>

<p class="text-base">{text}</p>
