<template>
	<header class="container-fluid">
		<!-- Logo -->
		<div>
			<NuxtLink to="/">
				<img src="~assets/img/logos/small.jpeg" alt="" class="logo" />
			</NuxtLink>
		</div>

		<!-- Nav -->
		<div class="ms-5">
			<LayoutsNav />
		</div>

		<!-- Profile -->
		<nav class="ms-auto">
			<div
				class="nav-link c-pointer"
				@click="authStore.logout()"
				v-if="authStore.isAuthenticated"
			>
				Logout
			</div>
			<NuxtLink to="/auth" class="nav-link" v-else>Login</NuxtLink>
		</nav>
	</header>
</template>

<script setup>
const authStore = useAuthStore();
</script>
