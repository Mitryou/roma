<script lang="ts">
    export let data: any; // TODO set correct type

    $: title = data.title;
    $: description = data.description;
</script>

<div class="flex justify-between items-center p-4 bg-iron">
    <div>
        <h3 class="text-lg font-bold">{title}</h3>
        <p class="text-sm">{description}</p>
    </div>
</div>
