<template>
	<section>
		<div class="row">
			<div class="col-md-3">
				<project-sidebar :project="project" />
			</div>

			<div class="col-md-9">
				<div>
					<h1 class="my-3">Backlog: {{ project.title }}</h1>
					<NuxtLink :to="{ name: 'projects' }">
						<button>Return</button>
					</NuxtLink>
					<hr />
				</div>

				<div>
					<!-- Sprints -->
					<project-sprint v-for="sprint in sprints" :key="sprint.id" :sprint :project />

					<!-- Backlog-->
					<project-backlog :tasks="backlog.tasks" :project />
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import Project from '@/models/Project';

const { id: projectId } = useRoute().params;
const project = computed(() => useRepo(Project).with('sprints').with('tasks').find(projectId));

const sprints = ref<any>({
	id: null,
	tasks: null,
});

const backlog = ref<any>({
	tasks: null,
});

formatBacklog();

watch(project, () => {
	formatBacklog();
});

function formatBacklog() {
	sprints.value = project.value.sprints.map((sprint) => ({
		...sprint,
		tasks: project.value.tasks.filter((task) => task.sprint_id === sprint.id),
	}));

	backlog.value = {
		tasks: project.value.tasks.filter((task) => !task.sprint_id),
	};
}
</script>
