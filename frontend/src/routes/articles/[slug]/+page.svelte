<script lang="ts">
    import PostCardList from '$lib/components/PostCardList.svelte';

    /** @type {import('./$types').PageData} */
    export let data: any;

    $: posts = data.posts;
</script>

<main class="py-5">
    <div class="container mx-auto">
        <h1 class="page-title">Новости</h1>

        {#if posts.length > 0}
            <PostCardList posts={posts} />
        {/if}
    </div>
</main>
