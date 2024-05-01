<script lang="ts">
    import {BACKEND_URL} from '../../../config';
    import CKEditorContent from '$lib/components/CKEditorContent.svelte';

    export let data: any;
</script>

<svelte:head>
    <title>{data.person.attributes.metaTitle}</title>
    <meta name="description" content={data.person.attributes.metaDescription} />
</svelte:head>

<main class="py-5">
    <div class="container mx-auto">
        <div class="max-w-4xl container mx-auto padding">
            <article class="flex flex-col gap-4">
                <header class="flex gap-3">
                    <div class="flex-1 flex flex-col justify-between gap-4">
                        <blockquote>
                            <p class="text-2xl font-noto-sans font-normal mb-8">{data.person.attributes.title}</p>
                            <cite class="text-xl font-noto-sans font-thin not-italic">{data.person.attributes.name}</cite>
                        </blockquote>
                    </div>
                    <div class="w-full sm:w-[290px]">
                        <img src={`${BACKEND_URL}${data.person.attributes.thumbnail.data.attributes.url}`} alt={data.person.attributes.name} class="w-full h-full object-cover">
                    </div>
                </header>
                {#if data.person.attributes.content}
                    <CKEditorContent content={data.person.attributes.content}/>
                {/if}
            </article>
        </div>
    </div>
</main>
