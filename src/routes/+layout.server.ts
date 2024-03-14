export const load = async (event) => {
	const session = await event.locals.getSession();

	// solving the case when the session is null, i.e. the user was deleted from the database
	// but the browser still has a cookie/loggedin user +layout.server.js will delete the cookie
	if (session == null) {
		event.cookies.delete(event.locals.supabase.storageKey, { path: '/' });
	}

	return {
		session,
	};
};
