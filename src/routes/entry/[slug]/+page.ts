import { error } from '@sveltejs/kit';

export function load({ params, url }) {

    return {
        title: params.slug,
        content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
    };

    // throw error(404, 'Not found');
}