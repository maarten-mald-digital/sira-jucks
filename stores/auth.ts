import { defineStore } from 'pinia';

const apiBaseUrl = `http://api.sirajucks.test`;

interface userType {
	id: number | null;
	name: string | null;
	email: string | null;
	email_verified_at: string | null;
	created_at: string | null;
	updated_at: string | null;
}
interface authState {
	user: object | null;
	isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
	state: (): authState => {
		return {
			user: <userType>{},
			isAuthenticated: false,
		};
	},

	persist: true,

	actions: {
		async fetchUser() {
			try {
				const user = await $fetch(`${apiBaseUrl}/api/user`, {
					method: 'GET',
					credentials: 'include',
					headers: {
						'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
					},
				});

				this.user = user;
				this.isAuthenticated = true;
			} catch (error) {
				console.log('fetchUser catch:', error);
			}
		},

		async setCsrfCookie() {
			await $fetch(`${apiBaseUrl}/sanctum/csrf-cookie`, {
				method: 'GET',
				withCredentials: true,
				credentials: 'include',
			});
		},

		async logout() {
			await this.setCsrfCookie();

			try {
				await $fetch(`${apiBaseUrl}/api/logout`, {
					method: 'POST',
					withCredentials: true,
					credentials: 'include',
					headers: {
						'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
					},
				});

				this.user = {};
				this.isAuthenticated = false;

				await navigateTo('/auth');
			} catch (error) {
				console.log('logout catch:', error);
			}
		},

		async login(email: string, password: string) {
			await this.setCsrfCookie();

			try {
				await $fetch(`${apiBaseUrl}/api/login`, {
					method: 'POST',
					withCredentials: true,
					credentials: 'include',
					headers: {
						'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
					},
					body: {
						email: email,
						password: password,
					},
				});

				await this.fetchUser();
				await navigateTo('/projects');
			} catch (error) {
				console.log('loginUser catch:', error);
			}
		},

		async register(name: string, email: string, password: string) {
			await this.setCsrfCookie();

			try {
				await $fetch(`${apiBaseUrl}/api/register`, {
					method: 'POST',
					withCredentials: true,
					credentials: 'include',
					headers: {
						'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
					},
					body: {
						name: name,
						email: email,
						password: password,
					},
				});

				await this.login(email, password);
			} catch (error) {
				console.log('register catch:', error);
			}
		},
	},
});
