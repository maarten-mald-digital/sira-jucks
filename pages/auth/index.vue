<template>
	<div class="container mt-5">
		<div class="row">
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
definePageMeta({
	layout: 'auth',
});

const authStore = useAuthStore();

const registerFields = reactive({
	name: null,
	email: null,
	password: null,
});

const loginFields = reactive({
	email: 'm@m.nl',
	password: '123123',
});

async function login() {
	console.log('login');
	await authStore.login(loginFields.email, loginFields.password);
}

async function register() {
	console.log('register');
	await authStore.register(
		registerFields.name,
		registerFields.email,
		loginFields.password
	);
}
</script>
