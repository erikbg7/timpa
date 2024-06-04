// import { redirect } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';

// TODO: figure out how to fix this error
// Change to prerender false, ssr true to fix
// Cannot use `cookies.set(...)` after the response has been generated
export const prerender = true;
export const ssr = true;