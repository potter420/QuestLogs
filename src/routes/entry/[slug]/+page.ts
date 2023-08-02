import { getS3Client } from '$lib/aws/client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
	const res = await getS3Client();
	let content = '';
	if (res) {
		const {s3Client, user} = res;
		await s3Client.send(new GetObjectCommand({
			Bucket: 'journal-content',
			Key: `${user.profile.sub}/${params.slug}`
		})).then(async data => {
			content = await data.Body?.transformToString() || '';
		});
	}
	return {
		title: params.slug,
		content: content,
		url: url.searchParams
	};

	// throw error(404, 'Not found');
}
