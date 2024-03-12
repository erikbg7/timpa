export const load = async ({ locals, cookies }) => {
	let session = await locals.auth.queries.getSession();

	// solving the case when the session is null, i.e. the user was deleted from the database
	// but the browser still has a cookie/loggedin user +layout.server.js will delete the cookie
	if (session == null) {
		cookies.delete(locals.auth.queries.getStorageKey(), { path: '/' });
	}

	return {
		session,
	};
};
