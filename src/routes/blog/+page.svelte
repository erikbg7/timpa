<script lang="ts">
	export let data;

	console.log({ data });
</script>

<section>
	<div class="grid w-full grid-cols-3 gap-8">
		{#each data.posts as post}
			<div class="rounded-md border border-white/10">
				<a href={`/blog/${post.slug}`}>
					<div>
						<img alt={post.featuredImageAlt} src={post.featuredImage} />
					</div>
					<div class="p-4">
						<h2 class="font-semibold">
							{post.postTitle}
						</h2>
						<time>{post.postDate}</time>
						<p>{post.postDescription}</p>
					</div>
				</a>
			</div>
		{/each}
	</div>
</section>
