<template>
	<section class="container-fluid">
		<h1 class="my-3">Create new project</h1>

		<div>
			<NuxtLink to="/projects"><button>Return</button></NuxtLink>
		</div>

		<hr />

		<div>
			<div class="mb-3">
				<label for="title" class="form-label">Project name</label>
				<input
					v-model="projectTitle"
					type="text"
					class="form-control"
					id="title"
				/>
			</div>

			<button class="btn btn-primary" @click="createProject()">
				Create
			</button>
		</div>
	</section>
</template>

<script lang="ts" setup>
const projectTitle = defineModel('title', { default: '' });

async function createProject() {
	console.log('createProject()');

	const result = await GqlCreateProject({
		input: { title: projectTitle.value },
	});

	projectTitle.value = '';

	return navigateTo('/projects');
}
</script>
