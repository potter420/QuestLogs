<script lang="ts">
	let entries = ['a', 'b', 'c'];
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<ul>
	{#each entries as entry}
		<li><a href="/entry/{entry}">{entry}</a></li>
	{/each}
</ul>
