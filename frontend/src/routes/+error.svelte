<script>
    import { page } from '$app/stores';
</script>

<div class="container mx-auto">
    <div class="flex justify-center">
        <h1>{$page.error.message}</h1>
    </div>
</div>
