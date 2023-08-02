<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores/userStore';
	import { onDestroy } from 'svelte';

	let ok = false;

	const unsubscribe = userStore.subscribe((user) => {
		if ($page.url.pathname == '/login') {
			ok = true;
			return;
		}
		if (!user.authenticated) {
			goto('/login');
		}
	});
	onDestroy(unsubscribe);
</script>

{#if ok}
	<slot />
{:else}
	<div />
{/if}
