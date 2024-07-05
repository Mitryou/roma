<script lang="ts">
    export let data;

    $: history = data.history
</script>

<main class="py-4">
    <div class="container mx-auto">
        <div class="my-4">
            <h1 class="page-title">Главы</h1>
            <nav class="padding">
                <ul>
                    {#each history.attributes.chapters.data as chapter, index}
                        <li>
                            <a href="/history/{history.attributes.slug}/chapters/{chapter.slug}" class="font-semibold hover:text-iron">{index + 1}. {chapter.attributes.title}</a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
    </div>
</main>
