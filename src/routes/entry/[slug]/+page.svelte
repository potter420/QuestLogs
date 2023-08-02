<script lang="ts">
	import type { PageData } from './$types';
	import { Marked } from '@ts-stack/markdown';
	export let data: PageData;
</script>

<h1>{data.title}</h1>
<div>{@html Marked.parse(data.content)}</div>
