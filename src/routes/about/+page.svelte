<script lang="ts">
	import { goto } from "$app/navigation";

    let a = 0;
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function demo() {
        for (let i = 0; i < 5; i++) {
            a = i;
            await sleep(i * 500);
        }
        console.log('Done');
        // window.location.assign("https://google.com");
    }

    demo();
</script>

<p>This is a about site, counter {a}</p>