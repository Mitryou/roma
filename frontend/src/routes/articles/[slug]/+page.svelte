<script lang="ts">
    import {BACKEND_URL} from '../../../config';
    import CKEditorContent from '$lib/components/CKEditorContent.svelte';
    import {onMount} from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data: any;

    $: article = data.article;

    $: bgImageUrl = null;

    onMount(() => {
        if (article.attributes.backgroundImage.data) {
            bgImageUrl = `${BACKEND_URL}${article.attributes.backgroundImage.data.attributes.url}`;
        }
    });
</script>

<article class="py-5">
    <header class={`mb-4 ${bgImageUrl ? 'bg-cover bg-no-repeat bg-center py-40' : ''}`} style:background-image={bgImageUrl ? `url(${bgImageUrl})` : ''}>
        <div class="container mx-auto padding">
            <h1 class="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-oswald font-bold normal-case leading-tight">{article.attributes.title}</h1>
        </div>
    </header>
    <div class="container mx-auto padding">
        <CKEditorContent content={article.attributes.content}/>
        {#if article.attributes.sourcelist}
            <div class="flex flex-col gap-4">
                {#each article.attributes.sourcelist.itemGroup as item, index}
                    <p id={item.anchorId ?? ''}>{index + 1}. {item.author} {item.name} — {item.source}{item.pageNumber ? ` — стр. ${item.pageNumber}` : ''}{item.link ? `, <a href='${item.link}'>ссылка</a>` : ''}</p>
                {/each}
            </div>
        {/if}
    </div>
</article>
