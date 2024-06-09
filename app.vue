<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script lang="ts" setup>
import Project from '~/models/Project';

const config = useRuntimeConfig();

const { data: projects } = await useFetch('/projects', {
	baseURL: config.public.apiBase,
});

console.log('app.vue| root call');

useRepo(Project).fresh(projects.value);
</script>
