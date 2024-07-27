<template>
	<div class="create-task" ref="taskBar">
		<!-- Inactive -->
		<div v-if="!isActive" @click="openCreate()" class="create-task-option">+ Add a task</div>

		<!-- Active -->
		<div v-else class="create-task-option">
			<input
				ref="input"
				type="text"
				v-model="title"
				@keydown.enter="createTask(sprintId)"
				placeholder="Describe your task"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { TaskRepository } from '@/repositories/TaskRepository';

const props = defineProps({
	sprintId: {
		type: [null, Number],
		default: null,
	},
});

const taskBar = ref(null);
const input = ref('input');
const isActive = ref(false);

async function openCreate() {
	isActive.value = true;
	await nextTick();
	input.value.focus();
}

function closeCreate() {
	isActive.value = false;
}

onClickOutside(taskBar, closeCreate);

const title = ref('');

function createTask(sprintId: number | null) {
	TaskRepository.create({ sprint_id: sprintId, title: title.value });
	title.value = '';
	closeCreate();
}
</script>

<style scoped lang="scss">
.create-task {
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 10px;
	background-color: rgb(196, 196, 196);
	height: 50px;
	color: black;

	&:hover {
		background-color: rgb(176, 176, 176);
	}

	.create-task-option {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
	}
}
</style>
