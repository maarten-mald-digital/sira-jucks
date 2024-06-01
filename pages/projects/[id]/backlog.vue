<template>
	<section>
		<div class="row">
			<div class="col-md-3">
				<project-sidebar :project="project" />
			</div>

			<div class="col-md-9">
				<h1 class="my-3">Backlog: {{ project.title }}</h1>
				<NuxtLink :to="{ name: 'projects' }">
					<button>Return</button>
				</NuxtLink>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
const route = useRoute();
const projectId = Number(route.params.id);
const project = ref<any>(null);

await useAsyncGql({
	operation: 'GetProject',
	variables: { id: projectId },
}).then((response) => {
	project.value = response.data.value.project;
});
</script>
