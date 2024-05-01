<script lang="ts">
    import {BACKEND_URL} from '../../config';

    export let person: any;
</script>


<article class="lg:h-[482px] bg-dark-charcoal flex flex-col-reverse md:flex-row justify-between items-stretch gap-4 p-12">
    <div class="flex-1 flex flex-col justify-between gap-4">
        <blockquote>
            <p class="text-2xl font-noto-sans font-normal mb-8">{person.attributes.title}</p>
            <cite class="text-xl font-noto-sans font-thin not-italic">{person.attributes.name}</cite>
        </blockquote>
        <a href="/persons/{person.attributes.slug}" class="link">Смотреть интервью</a>
    </div>
    <div class="w-full sm:w-[290px] flex-shrink-0">
        <img src={`${BACKEND_URL}${person.attributes.thumbnail.data.attributes.url}`} alt={person.attributes.name} class="w-full h-full object-cover">
    </div>
</article>
