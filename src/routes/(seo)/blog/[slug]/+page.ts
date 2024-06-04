import { getBlogEntries, getPostBySlug } from '$lib/blog/utils';

export const prerender = true;
export const ssr = false;

export async function load({ params }) {
	const { content, metadata } = await getPostBySlug(params.slug);

	return {
		content,
		title: metadata.postTitle,
		date: metadata.postDate,
		description: metadata.postDescription,
		readingTime: metadata.postReadingTime,
		image: metadata.featuredImage,
		slug: params.slug,
	};
}

export async function entries() {
	const entries = await getBlogEntries();
	return entries;
}
