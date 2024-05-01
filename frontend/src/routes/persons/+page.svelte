<script lang="ts">
    import PersonCard from '$lib/components/PersonCard.svelte';

    /** @type {import('./$types').PageData} */
    export let data: any;
</script>

<main class="py-5">
    <div class="container mx-auto">
        <h1 class="page-title">Интервью</h1>

        {#if data.persons.length > 0}
            <section class="flex flex-col gap-6 max-w-4xl padding">
                {#each data.persons as person}
                    <PersonCard person={person} />
                {/each}
            </section>
        {/if}
    </div>
</main>
