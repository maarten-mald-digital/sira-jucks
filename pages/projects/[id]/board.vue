<template>
	<section>
		<div class="row">
			<div class="col-md-3">
				<project-sidebar :project="project" />
			</div>

			<div class="col-md-9">
				<div>
					<h1 class="my-3">Bord</h1>
					<NuxtLink :to="{ name: 'projects' }">
						<button>Return</button>
					</NuxtLink>
					<hr />
				</div>

				<div class="boards kanban"></div>
			</div>
		</div>

		<!-- <div class="container-fluid"> -->
		<!-- <h1>board</h1> -->
		<!-- <div class="row">
				<div class="col-md-3">
					<project-sidebar :project="project" />
				</div>

				<div class="col-md-9">
					<div>
						<h1 class="my-3">Board: {{ project.title }}</h1>
						<NuxtLink :to="{ name: 'projects' }">
							<button>Return</button>
						</NuxtLink>
						<hr />
					</div>

					<div class="boards kanban">
						<div class="row">
							<div class="col-6">
								<h2>To-Do</h2>
								<draggable
									v-model="todoList"
									group="tasks"
									class="list"
									@end="onEnd"
									itemKey="name"
								>
									<template #item="{ element, index }">
										<div class="list-item">
											{{ element.title }}
										</div>
									</template>
								</draggable>
							</div>

							<div class="col-6">
								<h2>Done</h2>
								<draggable
									v-model="doneList"
									group="tasks"
									class="list"
									@end="onEnd"
									itemKey="name"
								>
									<template #item="{ element, index }">
										<div class="list-item">
											{{ element.title }}
										</div>
									</template>
								</draggable>
							</div>
						</div>
					</div>

					<div class="boards kanban">
						<div class="row">
							<div class="col-3" v-for="lane in lanes">
								<h2>{{ lane.title }}</h2>
								<draggable
									v-model="lane.tasks"
									group="tasks"
									class="list"
									@end="onEnd"
									itemKey="name"
								>
									<template #item="{ element, index }">
										<div class="list-item">
											{{ element.title }}
										</div>
									</template>
								</draggable>
							</div>
						</div>
					</div>
				</div>
			</div> -->
		<!-- </div> -->
	</section>
</template>

<script lang="ts" setup>
import Project from '@/models/Project';

const { id: projectId } = useRoute().params;
const project = computed(() => useRepo(Project).with('sprints').with('tasks').find(projectId));

// import draggable from 'vuedraggable';

// const route = useRoute();
// const projectId = Number(route.params.id);
// const project = ref<any>(null);

// const lanes = ref<any>();

// await useAsyncGql({
// 	operation: 'GetProject',
// 	variables: { id: projectId },
// }).then((response) => {
// 	project.value = response.data.value.project;
// });

// Draggable test
// interface Task {
// 	id: number;
// 	title: string;
// }

// interface Lane {
// 	id: number;
// 	title: string;
// 	tasks: Task[];
// }

// const todoList = ref<Task[]>([
// 	{ id: 1, title: 'Task 1' },
// 	{ id: 2, title: 'Task 2' },
// 	{ id: 3, title: 'Task 3' },
// ]);

// const doneList = ref<Task[]>([]);

// const board = ref<any[]>([{
// 	lanes:
// }]);

// const lanes = ref<Lane[]>([
// 	{
// 		id: 1,
// 		title: 'to do',
// 		tasks: [
// 			{ id: 1, title: 'Task 1' },
// 			{ id: 2, title: 'Task 2' },
// 			{ id: 3, title: 'Task 3' },
// 		],
// 	},
// 	{ id: 2, title: 'in progress', tasks: [{ id: 4, title: 'Task 4' }] },
// 	{ id: 3, title: 'test', tasks: [] },
// 	{ id: 4, title: 'done', tasks: [] },
// ]);

// function onEnd(event: any) {
// 	// Handle the end of drag-and-drop event if needed
// 	console.log('Drag ended:', event);
// }
</script>
