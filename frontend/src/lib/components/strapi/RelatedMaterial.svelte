<script lang="ts">
    import {BACKEND_URL} from '../../../config';

    export let data: any; // TODO set correct type

    console.log(data);

    $: title = data.title;
    $: description = data.description;
    $: thumbnail = data.thumbnail;
    $: article = data.article;
</script>

{#if article?.data}
    <a href="/articles/{article.data.attributes.slug}" class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-5 p-6 bg-iron text-black">
        <div class="flex flex-col justify-between gap-3">
            <p class="text-sm font-light">Связанный материал</p>
            <div>
                <h3 class="text-2xl md:text-3xl font-medium font-oswald mb-2">{title}</h3>
                <p class="text-normal">{description}</p>
            </div>
        </div>
        <div class="w-[200px] h-[120px] overflow-hidden">
            <img class="w-full object-cover" src={`${BACKEND_URL}${thumbnail.data.attributes.url}`} alt={title}>
        </div>
    </a>
{/if}
