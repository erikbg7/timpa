# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

# HELP

- Generate supabase types

  - `npx supabase gen types typescript --project-id [DB_PASSWORD] --schema public > types/supabase.ts`

- Change content in `static/robots.txt`
- Generate sitemap
  - `npx svelte-add sitemap`
- Update icons
- Update SEO component

## Images

- Resize and convert images to webp using [Squoosh](https://squoosh.app/)

## Icons

- Get the icons from:
  - [Heroicons](https://heroicons.com/)
  - [Lucide](https://lucide.dev/icons/)
  - [Icons8](https://icons8.com/icons/set/tiktok)

## SEO

- Primary keywords should appear in title tag, meta description and heading tags to help Search Engines to properly identify the topic of this webpage.

- Add [Structured Data](https://developers.google.com/search/docs/appearance/structured-data/search-gallery):
  - [Article](https://developers.google.com/search/docs/data-types/article)
  - [Breadcrumb](https://developers.google.com/search/docs/data-types/breadcrumb)
  - [FAQ](https://developers.google.com/search/docs/data-types/faqpage)
  - [SiteLinks Search Box](https://developers.google.com/search/docs/data-types/sitelinks-searchbox)
  - [How-to](https://developers.google.com/search/docs/data-types/how-to)
  - [Product](https://developers.google.com/search/docs/data-types/product)
- Check [social sharing](https://www.opengraph.xyz/url/https%3A%2F%2Flavelada.es%2F) via OG tags
- Check and [Optimise](https://www.seoptimer.com/svelte-saas-template.vercel.app) SEO

## Launch

- Publish to Indie Hackers
- Publish to Product Hunt
- Publish to Reddit
- Publish to [Webwiki](https://www.webwiki.com/)
