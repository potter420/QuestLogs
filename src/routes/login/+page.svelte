<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { userManager } from '$lib/stores/userStore';

	async function onClick() {
		let user = await userManager.signinPopup();
		console.log(user);
		// window.location.assign("/")
	}
</script>

<Button on:click={onClick} variant="raised">
	<Label>Login</Label>
</Button>
