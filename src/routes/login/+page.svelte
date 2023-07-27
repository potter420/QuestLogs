<script lang="ts">
    import Button, { Label } from '@smui/button';
    import { userStore } from '$lib/stores/userStore';

    function onClick() {
        userStore.set({
            name: "test",
            token: "some token",
            authenticated: true
        });
        window.location.assign("/")
    }
</script>

<Button on:click={onClick} variant="raised">
    <Label>Login</Label>
</Button>