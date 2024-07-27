<template>
	<div class="sprint mt-3">
		<div class="header">
			<h3>{{ sprint.title }}</h3>
			<div>
				<button @click="deleteSprint(sprint.id)">Delete sprint</button>
				<button @click="startSprint(sprint)">Start sprint</button>
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
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import Sprint from '@/models/Sprint';
import { TaskRepository } from '@/repositories/TaskRepository';
import { SprintRepository } from '@/repositories/SprintRepository';

const props = defineProps({
	sprint: {
		type: Object,
		required: true,
	},
});

const sprint = computed(() => props.sprint);

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

function deleteSprint(sprintId: number) {
	SprintRepository.delete(sprintId);
}

function startSprint(sprint: Sprint) {
	console.log(sprint);
}
</script>
