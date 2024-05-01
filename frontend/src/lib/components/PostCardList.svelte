<script lang="ts">
    import PostCard from "$lib/components/PostCard.svelte";
    import type {Post} from '../../types';

    export let posts: Post[];
</script>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 mb-10">
    {#each posts as post}
        <PostCard post={post} />
    {/each}
</section>
