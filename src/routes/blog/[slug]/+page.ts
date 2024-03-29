import { getBlogEntries, getPostBySlug } from '$lib/content/utils';

export const prerender = true;
export const ssr = false;

export async function load({ params }) {
	const { content, metadata } = await getPostBySlug(params.slug);
	const { postTitle, postDate } = metadata;

	return {
		content,
		title: postTitle,
		date: postDate,
	};
}

export async function entries() {
	const entries = await getBlogEntries();
	return entries;
}
