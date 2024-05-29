<script>
    import { page } from '$app/stores';
</script>

<div class="h-full flex justify-center items-center">
    <h1 class="text-3xl">{$page.error.message}</h1>
</div>
