<template>
	<div class="backlog mt-5 bg-grey">
		<div class="header">
			<h3>Backlog</h3>
			<div>
				<button @click="createSprint()">Create sprint</button>
			</div>
		</div>

		<draggable
			v-model="tasks"
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
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { TaskRepository } from '@/repositories/TaskRepository';
import { SprintRepository } from '@/repositories/SprintRepository';

const props = defineProps({
	project: {
		type: Object,
		required: true,
	},
	tasks: {
		type: Array,
		required: true,
	},
});

const project = computed(() => props.project);
const tasks = computed(() => props.tasks);

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
</script>
