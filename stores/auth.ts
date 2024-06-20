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
			console.log('fetchUser');

			await $fetch(`${apiBaseUrl}/api/user`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
			})
				.then((response) => {
					console.log('then');
					console.log(response);

					// console.log(user);

					this.user = response;
					this.isAuthenticated = true;
				})
				.catch((e) => {
					console.log('fetchUser catch');
					console.log(e);
				});
		},

		async setCsrfCookie() {
			// console.log('getCsrfToken()');
			await $fetch(`${apiBaseUrl}/sanctum/csrf-cookie`, {
				method: 'GET',
				withCredentials: true,
				credentials: 'include',
			});
			// console.log(useCookie('XSRF-TOKEN').value);
		},

		async logout() {
			console.log('logout() - need to fix');
			// await this.setCsrfCookie();

			this.user = {};
			this.isAuthenticated = false;

			navigateTo('/auth');
		},

		async login(email: string, password: string) {
			// console.log('login()');
			await this.setCsrfCookie();

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
			})
				.then((response) => {
					// console.log('then');
					// console.log(response);
					this.fetchUser();

					navigateTo('/projects');
				})
				.catch((e) => {
					console.log('catch');
					console.log(e);
				});
		},

		async register(name: string, email: string, password: string) {
			console.log('register');

			await this.setCsrfCookie();

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
			})
				.then((r) => {
					console.log('then');
					console.log(r);
				})
				.catch((e) => {
					console.log('catch');
					console.log(e);
				});
		},
	},
});
