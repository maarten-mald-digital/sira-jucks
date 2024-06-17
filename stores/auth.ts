import { defineStore } from 'pinia';

const apiBaseUrl = `http://api.sirajucks.test`;

export const useAuthStore = defineStore('auth', {
	state: () => {
		return {
			user: null,
			csrfToken: null,
		};
	},

	actions: {
		async setCsrfCookie() {
			console.log('getCsrfToken()');

			await $fetch(`${apiBaseUrl}/sanctum/csrf-cookie`, {
				method: 'GET',
				withCredentials: true,
				credentials: 'include',
			});

			// console.log(useCookie('XSRF-TOKEN').value);
		},

		async login(email: string, password: string) {
			console.log('login()');

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
				.then((r) => {
					console.log('then');
					console.log(r);
				})
				.catch((e) => {
					console.log('catch');
					console.log(e);
				});

			await this.fetchUser();
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

		async fetchUser() {
			console.log('fetchUser');

			const user = await $fetch(`${apiBaseUrl}/api/user`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
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

			console.log(user);
		},
	},
});
