<template>
	<section class="container-fluid">
		<h1 class="my-3">Edit project</h1>

		<div>
			<NuxtLink to="/projects"><button>Return</button></NuxtLink>
		</div>

		<hr />

		{{ project }}

		<div v-if="project">
			<div class="mb-3">
				<label for="title" class="form-label">Project name</label>
				hier: {{ title }}
				<input
					v-model="title"
					type="text"
					class="form-control"
					id="title"
				/>
			</div>

			<button class="btn btn-primary" @click="updateProject()">
				Save
			</button>
		</div>
	</section>
</template>

<script lang="ts" setup>
// @TODO test
// www.youtube.com/watch?v=tGhMaMIYRiI&ab_channel=NetNinja
const config = useRuntimeConfig();
// const title = defineModel();
const title = ref<string>('title');
// ref<string>(project.value?.title || '');

// const { id: projectId } = useRoute().params;

// const { data: project } = await useAsyncData('project', () =>
// 	$fetch(`/projects/${projectId}`, {
// 		baseURL: config.public.apiBase,
// 	})
// );

// const { data: project } = await useAsyncData('project', () =>
// 	$fetch(`/projects/${projectId}`, {
// 		baseURL: config.public.apiBase,

// 		onResponse({ response }) {
// 			// console.log(response._data.title);
// 			// title.value = response._data.title;
// 			console.log('kaas');
// 			title.value = 'damian';
// 		},
// 	})
// );

const { data: project } = await useFetch(`/projects/${projectId}`, {
	baseURL: config.public.apiBase,

	onResponse({ response }) {
		// console.log(response._data.title);
		// title.value = response._data.title;
		console.log('kaas');
		title.value = 'damian';
	},
});
</script>
