<script lang="ts">
    import { userManager } from '$lib/stores/userStore.js';
	import { onMount } from 'svelte';
    export let data;
    onMount( async () => {
        await userManager.signinPopupCallback(
            data.url.toString(),
        )
    })
   
</script>

{#each data.urlParam as [key, value]}
    <p>Key: {key} = {value}</p>
{/each}