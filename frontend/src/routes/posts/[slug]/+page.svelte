<script lang="ts">
    import {BACKEND_URL} from '../../../config';
    import CKEditorContent from '$lib/components/CKEditorContent.svelte';
    import {onMount} from 'svelte';

    export let data: any;

    $: post = data.post;
</script>

<svelte:head>
    <title>{post.attributes.metaTitle}</title>
    <meta name="description" content={post.attributes.metaDescription} />
</svelte:head>

<main class="py-5">
    <div class="max-w-4xl container mx-auto padding">
        <article>
            <header class="mb-4">
                <div class="flex flex-col gap-3 mb-4">
                    <p class="text-xs text-gray-300">{new Date(post.attributes.publishedAt).toLocaleDateString()}</p>
                    <h1 class="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold normal-case leading-tight">{post.attributes.title}</h1>
                </div>
                <div class="flex justify-center">
                    <img src={`${BACKEND_URL}${post.attributes.thumbnail.data.attributes.url}`} alt={post.attributes.title}>
                </div>
            </header>
            <CKEditorContent content={post.attributes.content}/>
        </article>
    </div>
</main>
