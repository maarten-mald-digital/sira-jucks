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

				<!-- <pre>{{ project }}</pre> -->
				<!-- <pre>{{ sprints }}</pre> -->
				<!-- <pre>{{ backlog }}</pre> -->

				<div>
					<!-- Sprints -->
					<div class="sprint mt-3" v-for="sprint in sprints">
						<h3>{{ sprint.title }}</h3>
						<draggable
							v-model="sprint.tasks"
							group="tasks"
							class="task-list"
							@end="onEnd"
							itemKey="name"
						>
							<template #item="{ element, index }">
								<div class="task-item">
									{{ element.title }}
								</div>
							</template>
						</draggable>
					</div>

					<!-- Backlog -->
					<div class="backlog mt-5">
						<h3>Backlog</h3>
						<draggable
							v-model="backlog.tasks"
							group="tasks"
							class="task-list"
							@end="onEnd"
							itemKey="name"
						>
							<template #item="{ element, index }">
								<div class="task-item">
									{{ element.title }}
								</div>
							</template>
						</draggable>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';

const route = useRoute();
const projectId = Number(route.params.id);
const project = ref<any>(null);

const sprints = ref<any>();
const backlog = ref<any>();

await useAsyncGql({
	operation: 'GetProject',
	variables: { id: projectId },
}).then((response) => {
	project.value = response.data.value.project;

	console.log(project.value);

	sprints.value = project.value.sprints.map((sprint) => ({
		...sprint,
		tasks: project.value.tasks.filter(
			(task) => task.sprint_id === sprint.id
		),
	}));

	backlog.value = {
		tasks: project.value.tasks.filter((task) => !task.sprint_id),
	};

	// console.log(sprints.value);
});

function onEnd(event: any) {
	// Handle the end of drag-and-drop event if needed
	console.log('Drag ended:', event);
}
</script>
