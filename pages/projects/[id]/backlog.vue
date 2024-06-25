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
					<pre>{{ project }}</pre>
					<!-- <div
						class="sprint mt-3"
						v-for="sprint in sprints"
						:key="sprint.id"
					>
						<h3>{{ sprint.title }}</h3>
						<draggable
							v-model="sprint.tasks"
							group="tasks"
							class="task-list"
							@end="onEnd"
							itemKey="id"
							:data-sprint-id="sprint.id"
						>
							<template #item="{ element, index }">
								<div
									class="task-item"
									:data-task-id="element.id"
								>
									{{ element.title }}
								</div>
							</template>
						</draggable>
					</div> -->

					<!-- <div class="backlog mt-5">
						<h3>Backlog</h3>
						<draggable
							v-model="backlog.tasks"
							group="tasks"
							class="task-list"
							@end="onEnd"
							itemKey="id"
							data-sprint-id=""
						>
							<template #item="{ element, index }">
								<div
									class="task-item"
									:data-task-id="element.id"
								>
									{{ element.title }}
								</div>
							</template>
						</draggable>
					</div> -->
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
const projectStore = useProjectStore();
const { id: projectId } = useRoute().params;
const project = projectStore.getProjectById(Number(projectId));

const backlog = projectStore.getProjectBacklog;
console.log(backlog);

// import draggable from 'vuedraggable';

// const route = useRoute();
// const projectId = Number(route.params.id);
// const project = ref<any>(null);

// const sprints = ref<any>();
// const backlog = ref<any>();

// await useAsyncGql({
// 	operation: 'GetProject',
// 	variables: { id: projectId },
// }).then((response) => {
// 	project.value = response.data.value.project;

// 	console.log(project.value);

// 	sprints.value = project.value.sprints.map((sprint) => ({
// 		...sprint,
// 		tasks: project.value.tasks.filter(
// 			(task) => task.sprint_id === sprint.id
// 		),
// 	}));

// 	backlog.value = {
// 		tasks: project.value.tasks.filter((task) => !task.sprint_id),
// 	};
// });

// function onEnd(event: any) {
// 	const taskId = event.item.dataset.taskId;
// 	const sprintId = event.to.dataset.sprintId;

// 	console.log(`taskId: ${taskId}`);
// 	console.log(`sprintId: ${sprintId}`);

// 	updateProjectTask(taskId, sprintId);
// }

// async function updateProjectTask(taskId: any, sprintId: any) {
// 	console.log('updateProjectTask');

// 	await GqlUpdateTask({
// 		input: {
// 			id: taskId,
// 			sprint_id: sprintId,
// 		},
// 	})
// 		.then((response) => {
// 			console.log('then()');
// 			console.log(response);
// 		})
// 		.catch((error) => {
// 			console.log('error()');
// 			console.log(error);
// 		});
// }
</script>
