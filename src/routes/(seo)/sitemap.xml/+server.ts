import { getAllPosts, type Post } from '$lib/blog/utils/index.js';
import config from '$config';
import { error } from '@sveltejs/kit';

export const prerender = true;
const { siteUrl } = config.website;

const render = (
	pages: string[],
	posts: Omit<Post, 'content'>[],
) => `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
		xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
		xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
		xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
		xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
		xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
		xmlns:xhtml="http://www.w3.org/1999/xhtml"
		>

		${pages
			.map(
				(element) => `
					<url>
						<loc>${siteUrl}${element}</loc>
						<lastmod>${`${process.env.VITE_BUILD_TIME}`}</lastmod>
					</url>`,
			)
			.join('\n')}

		${posts
			.map((element) => {
				// Keep last update as YYYY-MM-DD format
				const { postLastUpdate, slug } = element;
				return `
				<url>
				<loc>${siteUrl}/blog/${slug}</loc>
							<lastmod>${postLastUpdate}</lastmod>
						</url>
					`;
			})
			.join('')}
	</urlset>`;

/** @type {import('./$types').RequestHandler} */
export async function GET({ setHeaders }) {
	try {
		const posts = await getAllPosts();
		const pages = ['', '/privacy', '/security', '/terms'];

		setHeaders({
			'Cache-Control': 'max-age=0, s-max-age=600',
			'Content-Type': 'application/xml',
		});

		return new Response(render(pages, posts));
	} catch (err) {
		console.error(`Error in sitemap.xml: ${err}`);
		throw error(500, 'err');
	}
}
