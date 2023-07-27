export const ssr = false;

import { goto } from '$app/navigation';
import { userStore } from '$lib/stores/userStore';

export function load({url}) {
    let authenticated = false;
    userStore.subscribe((user) => {
        authenticated = user.authenticated;
    })
    if (!authenticated && (url.pathname != "/login")) {
        console.log(authenticated);
        goto("/login");
    }
    return {
        currentUrl: url.pathname
    }
}