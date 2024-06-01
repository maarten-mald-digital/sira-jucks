<template>
	<section class="container-fluid">
		<h1 class="my-3">Edit project</h1>

		<div>
			<NuxtLink to="/projects"><button>Return</button></NuxtLink>
		</div>

		<hr />

		<div v-if="project">
			<div class="mb-3">
				<label for="title" class="form-label">Project name</label>
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
const route = useRoute();
const projectId = Number(route.params.id);
const title = defineModel();
const project = ref<any>(null);

await useAsyncGql({
	operation: 'GetProject',
	variables: { id: projectId },
}).then((response) => {
	project.value = response.data.value.project;
	title.value = project.value.title;
});

async function updateProject() {
	console.log('updateProject');

	await GqlUpdateProject({
		input: {
			id: project.value.id,
			title: title.value,
		},
	})
		.then((response) => {
			console.log('then()');
			console.log(response);
		})
		.catch((error) => {
			console.log('error()');
			console.log(error);
		});
}
</script>
