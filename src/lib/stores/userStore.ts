import { writable } from 'svelte/store';

export interface User {
    name?: string,
    token?: string,
    authenticated: boolean
}

export const userStore = writable<User>({authenticated: false})