<script lang="ts">
    import type {TStrongText} from '$lib';

    export let data: TStrongText;

    $: text = data.text;
</script>

<p><strong>{text}</strong></p>
