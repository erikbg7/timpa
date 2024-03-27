type PostMetadata = {
	postDate: string;
	postLastUpdate: string;
	postTitle: string;
	postDescription: string;
	featuredImage: string;
	featuredImageAlt: string;
};

type Post = { content: string; slug: string } & PostMetadata;

type ImportedPosts = Record<string, () => Promise<{ metadata: PostMetadata }>>;

const getAllPosts = async () => {
	const files = import.meta.glob('../*.md') as ImportedPosts;

	const posts = await Promise.all(
		Object.keys(files).map(async (path) => {
			const slug = path.replace('../', '').replace('.md', '');
			const { metadata } = await files[path]();
			return { slug, ...metadata };
		}),
	);

	return posts as Omit<Post, 'content'>[];
};

const getPostBySlug = async (slug: string) => {
	const post = await import(`../${slug}.md`);
	const { metadata, default: content } = post;
	return { metadata, content } as { metadata: PostMetadata; content: string };
};

const getBlogEntries = async () => {
	const posts = await getAllPosts();
	return posts.map((p) => ({ slug: p.slug }));
};

export type { Post, PostMetadata };
export { getAllPosts, getBlogEntries, getPostBySlug };
