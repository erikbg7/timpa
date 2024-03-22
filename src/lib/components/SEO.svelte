<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	// import jost from "@fontsource-variable/jost/files/jost-latin-wght-normal.woff2"
	// import atomic from "/fonts/atomic.woff2"

	// import RichResults from '@/components/RichResults.astro';

	interface Preload {
		as: string;
		href: string;
		type: string;
		rel?: 'preload' | 'prefetch';
		crossorigin?: string;
	}

	export let title: string =
		'Flow Productivity App - Improve Your Results - Definitive Pomodoro Competitor';

	export let description: string =
		'Your database should be easy to use, not a source of frustration. Xata easily integrates into your developer workflow, providing the best data experience for GitHub, Vercel and Netlify based deployments.';

	export let preload: Preload[] = [];

	export let canonical: string = '';

	export let image: string = '/img/og.jpg';

	const canonicalURL = canonical
		? new URL(canonical, PUBLIC_BASE_URL)
		: new URL($page.url.pathname, PUBLIC_BASE_URL);
</script>

<svelte:head>
	<title>{title}</title>

	<meta charset="UTF-8" />
	<meta name="description" content={description} />

	<!-- <link rel="preload" href={atomic} as="font" type="font/woff2" crossorigin />
<link rel="preload" href={jost} as="font" type="font/woff2" crossorigin /> -->

	<!-- {
	preload?.map(({ href, as, type, rel = "preload", crossorigin }) => (
		<link {rel} {href} {as} {type} {crossorigin} />
	))
} -->

	<link rel="canonical" href={canonicalURL.toString()} />
	<meta name="viewport" content="width=device-width" />
	<meta name="theme-color" content="#d5ff00" />

	<meta name="keywords" content="flow, productivity, timer, study, mindset, improve" />

	<!-- HTML Meta Tags -->
	<title>Flow Productivity App - Improve Your Results - Definitive Pomodoro Competitor</title>
	<meta
		name="description"
		content="Your database should be easy to use, not a source of frustration. Xata easily integrates into your developer workflow, providing the best data experience for GitHub, Vercel and Netlify based deployments."
	/>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://lavelada.es/" />
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content="Flow Productivity App - Improve Your Results - Definitive Pomodoro Competitor"
	/>
	<meta
		property="og:description"
		content="Your database should be easy to use, not a source of frustration. Xata easily integrates into your developer workflow, providing the best data experience for GitHub, Vercel and Netlify based deployments."
	/>
	<meta property="og:image" content="https://lavelada.es/img/og.jpg" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="lavelada.es" />
	<meta property="twitter:url" content="https://lavelada.es/" />
	<meta
		name="twitter:title"
		content="Flow Productivity App - Improve Your Results - Definitive Pomodoro Competitor"
	/>
	<meta
		name="twitter:description"
		content="Your database should be easy to use, not a source of frustration. Xata easily integrates into your developer workflow, providing the best data experience for GitHub, Vercel and Netlify based deployments."
	/>
	<meta name="twitter:image" content="https://lavelada.es/img/og.jpg" />

	<!-- Meta Tags Generated via https://www.opengraph.xyz -->

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@infoLaVelada" />
	<meta name="twitter:creator" content="@IbaiLlanos" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={new URL(image, PUBLIC_BASE_URL).toString()} />

	<meta name="og:image" content={new URL(image, PUBLIC_BASE_URL).toString()} />
	<meta name="og:title" content={title} />
	<meta name="og:description" content={description} />
	<meta name="og:url" content={PUBLIC_BASE_URL} />
	<meta name="og:site_name" content="La Velada 4" />
	<meta name="og:type" content="website" />
	<meta name="og:locale" content="es_ES" />

	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />

	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<!-- TODO: missing icon below -->
	<link rel="apple-touch-icon" href="/img/icons/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />

	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<meta name="msapplication-config" content="/browserconfig.xml" />

	<!-- {
	!import.meta.env.DEV && (
		<>
			<script is:inline src="/registerSW.js" />
			<link rel="manifest" href="/manifest.webmanifest" />
		</>
	)
} -->

	<!-- <RichResults /> -->
</svelte:head>
