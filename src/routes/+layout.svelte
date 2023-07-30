<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
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
		if (user) {
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

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
</nav>
<div class="flexy">
	<div class="top-app-bar-container flexor">
		<TopAppBar variant="static" dense color="primary">
			<Row>
				<Section>
					<Title>HELP</Title>
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
		height: 320px;
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
