type Post = {
	metadata: {
		postDate: string;
		postTitle: string;
		postDescription: string;
		featuredImage: string;
		featuredImageAlt: string;
	};
};

type ImportedPosts = Record<string, () => Promise<Post>>;

const getAllPosts = async () => {
	const files = import.meta.glob('../*.md') as ImportedPosts;

	const posts = await Promise.all(
		Object.keys(files).map(async (path) => {
			const slug = path.replace('../', '').replace('.md', '');
			const { metadata } = await files[path]();
			return { slug, ...metadata };
		}),
	);

	return posts;
};

const getPostBySlug = async (slug: string) => {
	const post = await import(`../${slug}.md`);
	const { metadata, default: content } = post;
	return { metadata, content } as Post & { content: string };
};

const getBlogEntries = async () => {
	const posts = await getAllPosts();
	return posts.map((p) => ({ slug: p.slug }));
};

export { getAllPosts, getBlogEntries, getPostBySlug };
