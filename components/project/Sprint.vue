<template>
	<div class="sprint mt-3">
		<div class="modal" v-if="showModal">
			<div class="d-flex justify-content-between">
				<h3>Sprint starten</h3>
				<button @click="toggleStartSprint(sprint)">Close modal</button>
			</div>

			<div class="mb-3">
				<label for="title" class="form-label">Sprint name</label>
				<input v-model="startSprint.title" type="text" class="form-control" id="title" />
			</div>

			<div class="mb-3">
				<label for="duration" class="form-label">Duration</label>
				<select v-model="startSprint.duration" class="form-control" id="duration">
					<option value="1">1 week</option>
					<option value="2">2 weeks</option>
					<option value="3">3 weeks</option>
					<option value="4">4 weeks</option>
					<option value="custom">Custom</option>
				</select>
			</div>

			<div class="mb-3">
				<label for="starts-at" class="form-label">Starts at</label>
				<input
					v-model="startSprint.startsAt"
					type="text"
					class="form-control"
					id="starts-at"
				/>
			</div>

			<div class="mb-3">
				<label for="starts-at" class="form-label">Ends at</label>
				<input v-model="startSprint.endsAt" type="text" class="form-control" id="ends-at" />
			</div>
		</div>

		<div class="header">
			<h3>{{ sprint.title }}</h3>
			<div>
				<button @click="deleteSprint(sprint.id)">Delete sprint</button>
				<button @click="toggleStartSprint(sprint)">Start sprint</button>
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

// const props = defineProps(['sprint']);
const props = defineProps({
	sprint: {
		type: Object,
		required: true,
	},
});

const sprint = computed(() => props.sprint);

const showModal = ref<boolean>(false);

let startSprint = ref<object>({
	title: sprint.title,
	duration: '1',
	startsAt: '',
	endsAt: '',
});

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

function toggleStartSprint(sprint: Sprint) {
	console.log('toggleStartSprint()');
	showModal.value = !showModal.value;

	console.log(sprint.isMotion());

	// if (sprint) {
	// 	startSprint.title = sprint.title;
	// }
}
</script>
