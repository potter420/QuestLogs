<script lang="ts">
    export let data;
</script>

<p>Total journal entry</p>

<ul>
    {#each data.list as entry}
        <li><a href="/entry/{entry}">{entry}</a></li>
    {/each}
</ul>