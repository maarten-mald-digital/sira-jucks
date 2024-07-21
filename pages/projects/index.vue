<template>
	<section class="container-fluid">
		<h1 class="my-3">Projects</h1>

		<div>
			<NuxtLink :to="{ name: 'projects-create' }">
				<button>New project</button>
			</NuxtLink>
		</div>

		<hr />

		<!-- <pre>{{ projects }}</pre> -->

		<table class="table">
			<thead>
				<tr>
					<th scope="col">id</th>
					<th scope="col">Title</th>
					<th scope="col">&nbsp;</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="project in projects">
					<td>{{ project.id }}</td>
					<td>{{ project.title }}</td>
					<td>
						<NuxtLink
							:to="{
								name: 'projects-id-backlog',
								params: { id: project.id },
							}"
						>
							<button>view</button>
						</NuxtLink>
						<NuxtLink
							:to="{
								name: 'projects-id-edit',
								params: { id: project.id },
							}"
						>
							<button>Edit</button>
						</NuxtLink>
						<button @click="deleteProject(project.id)">
							Delete
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script lang="ts" setup>
import { ProjectRepository } from '@/repositories/ProjectRepository';

const projects = computed(() => ProjectRepository.all());

onMounted(async () => {
	console.log('mounted call');
	await ProjectRepository.fetchAll();
});

async function deleteProject(projectId: number) {
	console.log('delete()');

	await ProjectRepository.delete(projectId);
	// await projectStore.deleteProject(projectId);
}
</script>
