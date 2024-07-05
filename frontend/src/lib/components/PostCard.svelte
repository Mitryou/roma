<script lang="ts">
    import {BACKEND_URL} from '../../config';
    import type {Post} from '../../types';

    export let post: Post;
</script>

<article class="w-full md:w-[calc(var(--grid-col-width)_-_24px)] h-[511px] mx-auto overflow-hidden rounded-lg">
    <div class="h-full flex flex-col items-stretch bg-white">
        <div class="w-full h-[203px] rounded-lg bg-iron">
            <img src={`${BACKEND_URL}${post.attributes.thumbnail.data.attributes.url}`}
                 alt={post.attributes.title} class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col justify-between items-stretch text-black h-full">
            <div class="p-4 overflow-hidden">
                <span>{new Date(post.attributes.publishedAt).toLocaleDateString()}</span>
                <h4 class="h4">{post.attributes.title}</h4>
            </div>
            <a href="/posts/{post.attributes.slug}"
               class="p-4 flex justify-between items-center border-t border-black shrink-0 after:w-[34px] after:h-[34px] after:bg-[url('./icons/black-arrow-right.svg')] after:bg-no-repeat after:bg-center after:bg-cover after:shrink-0">
                Читать далее
            </a>
        </div>
    </div>
</article>
