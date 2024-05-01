<script lang="ts">
    import PostCardList from '$lib/components/PostCardList.svelte';

    /** @type {import('./$types').PageData} */
    export let data: any;
</script>

<main class="py-5">
    <div class="container mx-auto">
        <h1 class="page-title">Новости</h1>

        {#if data.posts.length > 0}
            <PostCardList posts={data.posts} />
        {/if}
    </div>
</main>
