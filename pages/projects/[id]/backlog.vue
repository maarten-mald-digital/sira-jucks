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
					<div
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
					</div>

					<!-- Backlog -->
					<div class="backlog mt-5">
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
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';

const { id: projectId } = useRoute().params;

const projectStore = useProjectStore();
const taskStore = useTaskStore();
const project = projectStore.getProjectById(Number(projectId));

const sprints = ref<any>();
const backlog = ref<any>();

sprints.value = project.sprints.map((sprint) => ({
	...sprint,
	tasks: project.tasks.filter((task) => task.sprint_id === sprint.id),
}));

backlog.value = {
	tasks: project.tasks.filter((task) => !task.sprint_id),
};

function onEnd(event: any) {
	console.log('onEnd()');

	const taskId = event.item.dataset.taskId;
	const sprintId = event.to.dataset.sprintId;

	console.log(`taskId: ${taskId}`);
	console.log(`sprintId: ${sprintId}`);

	updateProjectTask(taskId, sprintId);
}

function updateProjectTask(taskId: number, sprintId: number) {
	console.log('updateProjectTask()');

	// const task = project.tasks.find((task) => task.id === Number(taskId));
	// task.sprint_id = sprintId ? Number(sprintId) : null;
}
</script>
