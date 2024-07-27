<template>
	<section>
		<div class="row">
			<div class="col-md-3">
				<project-sidebar :project="project" />
			</div>

			<!-- <div class="col-md-9">
				<pre>{{ project }}</pre>
				<pre>{{ sprints }}</pre>
				<pre>{{ backlog }}</pre>
				<input type="text" v-model="taskTitle" />
				<button @click="createTask()">New kaolo task</button>
			</div> -->

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
					<!-- <pre>{{ sprints }}</pre> -->
					<div class="sprint mt-3" v-for="sprint in sprints" :key="sprint.id">
						<div class="header">
							<h3>{{ sprint.title }}</h3>
							<div>
								<button @click="deleteSprint(sprint.id)">Delete sprint</button>
							</div>
						</div>

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

						<project-create-task-bar :sprintId="sprint.id" />
					</div>

					<!-- Backlog -->
					<div class="backlog mt-5 bg-grey">
						<div class="header">
							<h3>Backlog</h3>
							<div>
								<button @click="createSprint()">Create sprint</button>
							</div>
						</div>

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

						<project-create-task-bar />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import Project from '@/models/Project';
// import Sprint from '@/models/Sprint';
import { TaskRepository } from '@/repositories/TaskRepository';
import { SprintRepository } from '@/repositories/SprintRepository';

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
	console.log('project changed');
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

function createSprint() {
	const sprint = {
		title: 'New sprint',
		project_id: project.value.id,
	};

	SprintRepository.create(sprint);
}

function deleteSprint(sprintId: number) {
	SprintRepository.delete(sprintId);
}
</script>
