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
					<div class="sprint mt-3" v-for="sprint in sprints" :key="sprint.id">
						<h3>{{ sprint.title }}</h3>
						<draggable
							v-model="sprint.tasks"
							group="tasks"
							class="task-list"
							@end="taskMoved"
							itemKey="id"
							:data-sprint-id="sprint.id"
						>
							<template #item="{ element, index }">
								<div class="task-item" :data-task-id="element.id">
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
							@end="taskMoved"
							itemKey="id"
							data-sprint-id=""
						>
							<template #item="{ element, index }">
								<div class="task-item" :data-task-id="element.id">
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
import Project from '@/models/Project';
import { TaskRepository } from '@/repositories/TaskRepository';

const { id: projectId } = useRoute().params;
const project = computed(() => useRepo(Project).with('sprints').with('tasks').find(projectId));

console.log(project.value);

const sprints = ref<any>();
const backlog = ref<any>();

sprints.value = project.value.sprints.map((sprint) => ({
	...sprint,
	tasks: project.value.tasks.filter((task) => task.sprint_id === sprint.id),
}));

backlog.value = {
	tasks: project.value.tasks.filter((task) => !task.sprint_id),
};

function taskMoved(event: any) {
	console.log('onEnd()');

	const taskId = event.item.dataset.taskId;
	let sprintId = Number(event.to.dataset.sprintId);

	console.log(`taskId: ${taskId}`);
	console.log(`sprintId: ${sprintId}`);

	if (!sprintId) {
		sprintId = null;
	}

	TaskRepository.update(Number(taskId), { sprint_id: sprintId });
}
</script>
