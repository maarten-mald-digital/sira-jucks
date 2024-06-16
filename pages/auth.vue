<template>
	<div class="container mt-5">
		<div class="row">
			<div class="col-md-12">
				<button @click="fetchUser()">fetch user</button>
			</div>

			<div class="col-md-6">
				<h1>Register</h1>

				<div>
					<label for="register_name">Name</label>
					<input
						type="text"
						v-model="registerFields.name"
						id="register_name"
					/>
				</div>
				<div>
					<label for="register_email">Email</label>
					<input
						type="text"
						v-model="registerFields.email"
						id="register_email"
					/>
				</div>
				<div>
					<label for="register_password">Password</label>
					<input
						type="text"
						v-model="registerFields.password"
						id="register_password"
					/>
				</div>

				<button @click="register()">Register</button>
			</div>

			<div class="col-md-6">
				<h1>Login</h1>
				<div>
					<label for="login_email">Email</label>
					<input
						type="text"
						v-model="loginFields.email"
						id="login_email"
					/>
				</div>
				<div>
					<label for="login_password">Password</label>
					<input
						type="text"
						v-model="loginFields.password"
						id="login_password"
					/>
				</div>

				<button @click="login()">login</button>
			</div>
		</div>

		<hr />
	</div>
</template>

<script setup>
const registerFields = reactive({
	name: null,
	email: null,
	password: null,
});

const loginFields = reactive({
	email: 'm@m.nl',
	password: '123123',
});

const apiBaseUrl = `http://localhost:8000`;

onMounted(async () => {
	setCsrfToken();
});

async function setCsrfToken() {
	console.log('set CsrfToken');

	await $fetch(`${apiBaseUrl}/sanctum/csrf-cookie`, {
		method: 'GET',
		withCredentials: true,
	});
}

async function login() {
	console.log('login');

	setCsrfToken();

	await $fetch(`${apiBaseUrl}/api/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
		},
		body: {
			email: loginFields.email,
			password: loginFields.password,
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
}

async function fetchUser() {
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
}

async function register() {
	console.log('register');

	setCsrfToken();

	await $fetch(`${apiBaseUrl}/api/register`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
		},
		body: {
			name: registerFields.name,
			email: registerFields.email,
			password: registerFields.password,
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
}
</script>
