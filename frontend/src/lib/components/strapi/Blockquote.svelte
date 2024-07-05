<script lang="ts">
    import type {TBlockquote} from '$lib';

    export let data: TBlockquote;

    $: text = data.text;
    $: author = data.author;
</script>

<blockquote class="border-s-4 ps-4 sm:ps-6">
    <p class="text-iron sm:text-xl"><em>{text}</em></p>
    {#if author}
        <cite class="text-base font-semibold text-gray-500">{author}</cite>
    {/if}
</blockquote>
