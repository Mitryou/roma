<script lang="ts">
    import type {TVideo} from '$lib';

    export let data: TVideo;

    $: link = data.link;
    $: description = data.description;
</script>



<div class='flex flex-col gap-3'>
    <iframe
            height="315"
            src={link}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
    ></iframe>
    {#if description}
        <p>{description}</p>
    {/if}

</div>

