<script lang="ts">
    import Paragraph from './Paragraph.svelte';
    import type {ITextComponent} from '$lib';

    export let data: ITextComponent;

    $: paragraphGroup = data.paragraphGroup;
</script>

{#if paragraphGroup.length}
    <div class="flex flex-col space-y-6">
        {#each paragraphGroup as paragraph }
            <Paragraph paragraph={paragraph} />
        {/each}
    </div>
{/if}
