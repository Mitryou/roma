<script lang="ts">
    import type {DynamicZoneComponent} from '../../../types';

    type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    interface textComponent extends DynamicZoneComponent {
        level: Level;
        text: string;
    }
    export let data:  textComponent;

    $: level = data.level;
    $: text = data.text;
</script>

{#if level === 'h1'}
    <h1>{text}</h1>
{:else if level === 'h2'}
    <h2>{text}</h2>
{:else if level === 'h3'}
    <h3>{text}</h3>
{:else if level === 'h4'}
    <h4>{text}</h4>
{:else if level === 'h5'}
    <h5>{text}</h5>
{:else if level === 'h6'}
    <h6>{text}</h6>
{/if}
