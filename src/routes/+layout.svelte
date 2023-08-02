<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label } from '@smui/button';
	import { userManager } from '$lib/stores/userStore.js';
	import { afterUpdate, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { User } from 'oidc-client-ts';
	export let data;
	let userName = '';
	onMount(() => {
		console.log('Mounted');
	});
	afterUpdate(async () => {
		let user = await userManager.getUser();
		if (user != null && (user.expired || false) != true) {
			console.log('authenticated');
			
			userName = user.profile.name || '';
			return;
		}
		if (data.currentUrl != '/login' && data.currentUrl != '/callback') {
			console.log(`go from ${data.currentUrl} to login now`);
			goto('/login');
		}
	});
</script>

<div class="flexy">
	<div class="top-app-bar-container flexor">
		<TopAppBar variant="static" dense color="primary">
			<Row>
				<Section>
					<Title>Journal</Title>
				</Section>
				<Section >
					<Button href="/"><Title >Home</Title></Button>
					<Button href="/about"><Title >About</Title></Button>
					<Button href="/journals"><Title >Journal</Title></Button>
				</Section>
			</Row>
		</TopAppBar>
		<div class="flexor-content">
			<slot />
			<p>Current URL: {data.currentUrl}</p>
			<p>Current User: {userName}</p>
		</div>
	</div>
</div>

<style>
	.top-app-bar-container {
		max-width: 100%;
		width: 100%;
		height: 90%;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		margin: 0 18px 18px 0;
		background-color: var(--mdc-theme-background, #fff);

		overflow: auto;
		display: inline-block;
	}

	@media (max-width: 480px) {
		.top-app-bar-container {
			margin-right: 0;
		}
	}

	.flexy {
		display: flex;
		flex-wrap: wrap;
		height: 100%;
	}

	.flexor {
		display: inline-flex;
		flex-direction: column;
	}

	.flexor-content {
		flex-basis: 0;
		height: 0;
		flex-grow: 1;
		overflow: auto;
	}
</style>
