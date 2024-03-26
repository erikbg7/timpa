import { getAllPosts } from '$content/lib';

export const prerender = true;
export const ssr = false;

export const load = async () => {
	const posts = await getAllPosts();
	return { posts };
};
