<template>
	<section class="container-fluid">
		<h1 class="my-3">Projects</h1>

		<div>
			<NuxtLink :to="{ name: 'projects-create' }">
				<button>New project</button>
			</NuxtLink>
		</div>

		<hr />

		<div v-if="error">
			{{ error }}
		</div>

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
								name: 'projects-id-board',
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
						<button @click="deleteProject(project)">Delete</button>
					</td>
				</tr>
			</tbody>
		</table>

		<hr />
	</section>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const { data: projects, error } = await useFetch('/projects', {
	baseURL: config.public.apiBase,
});
</script>
