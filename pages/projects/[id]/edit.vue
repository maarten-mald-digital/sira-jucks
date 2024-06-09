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
import Project from '~/models/Project';

const { id: projectId } = useRoute().params;
const title = ref<string>('title');

const project = useRepo(Project).find(projectId);
title.value = project.title;

function updateProject() {
	console.log('updateProject()');
	useRepo(Project).save({ id: 1, title: 'my test' });
}
</script>
