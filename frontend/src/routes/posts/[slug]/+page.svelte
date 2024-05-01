<script lang="ts">
    import {BACKEND_URL} from '../../../config';
    import CKEditorContent from '$lib/components/CKEditorContent.svelte';

    export let data: any;
    console.log(data);
</script>

<svelte:head>
    <title>{data.post.attributes.metaTitle}</title>
    <meta name="description" content={data.post.attributes.metaDescription} />
</svelte:head>

<main class="py-5">
    <div class="max-w-4xl container mx-auto padding">
        <article>
            <header class="mb-4">
                <div class="flex flex-col gap-3 mb-4">
                    <p class="text-xs text-gray-300">{new Date(data.post.attributes.publishedAt).toLocaleDateString()}</p>
                    <h1 class="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold normal-case leading-tight">{data.post.attributes.title}</h1>
                </div>
                <div class="flex justify-center">
                    <img src={`${BACKEND_URL}${data.post.attributes.thumbnail.data.attributes.url}`} alt={data.post.attributes.title}>
                </div>
            </header>
            <CKEditorContent content={data.post.attributes.content}/>
        </article>
    </div>
</main>
