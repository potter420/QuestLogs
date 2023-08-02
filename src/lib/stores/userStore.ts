import { User, UserManager } from 'oidc-client-ts';
import { writable, type Updater, get } from 'svelte/store';


export const userManager = new UserManager({
	authority: 'https://login.microsoftonline.com/2f3a77ab-a9ce-47ff-b607-b2f088e1e0cc/v2.0',
	client_id: 'e52f2000-837b-4639-bb2e-f30f2fd28f57',
	redirect_uri: 'http://localhost:5173/callback',
	loadUserInfo: true,
	mergeClaims: true,
});

export const checkAuthenticated =  (user: User | null) => {
	return user && !user.expired;
};
