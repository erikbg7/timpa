<script lang="ts">
	import H1 from '$ui/atoms/H1.svelte';

	export let data;
</script>

<section class="mt-16">
	<H1 title="Blog" className="w-fit text-6xl mb-12" />
	<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<article class="relative rounded-md border border-white/10">
				<div>
					<img
						alt={post.featuredImageAlt}
						src={post.featuredImage}
						width="800"
						height="520"
						loading="lazy"
						style:--image="image-{post.slug}"
					/>
				</div>
				<div class="border-t border-white/10 bg-accent-content p-4">
					<h2 class="font-semibold" style:--title="title-{post.slug}">
						<a href={`/blog/${post.slug}`}>
							{post.postTitle}
						</a>
					</h2>
					<time>{post.postDate}</time>
					<p>{post.postDescription}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	h2 {
		view-transition-name: var(--title);
	}

	img {
		view-transition-name: var(--image);
	}
</style>
