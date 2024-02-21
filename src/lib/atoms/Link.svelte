<script lang="ts">
	export let title: string;
	export let href: string;
	export let innerLink: boolean = false;
</script>

<a class="hover:cursor group w-fit text-accent" {href}
	>{title}
	{#if innerLink}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="mb-1 inline-block h-5 w-5 text-primary transition-all duration-200 ease-in-out group-hover:ml-2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
			/>
		</svg>
	{/if}
</a>
