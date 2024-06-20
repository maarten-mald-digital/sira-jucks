export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();
	const isLoggedIn = authStore.isAuthenticated;

	// Not logged in
	if (!isLoggedIn && to.path !== '/auth') {
		return navigateTo('/auth');
	}

	// Logged in trying to view login
	if (isLoggedIn && to.path === '/auth') {
		return navigateTo('/projects');
	}
});
