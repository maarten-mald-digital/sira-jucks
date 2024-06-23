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

			<button class="btn btn-primary" @click="update()">Save</button>
		</div>
	</section>
</template>

<script lang="ts" setup>
const projectStore = useProjectStore();
const { id: projectId } = useRoute().params;
const project = projectStore.getProjectById(Number(projectId));

let title = ref<string>('title');
title.value = project?.title;

function update() {
	projectStore.updateProject({ title: title.value }, Number(projectId));
}
</script>
