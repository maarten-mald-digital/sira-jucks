<template>
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

				<div class="create-task">
					<!-- <button @click="createTask(null)">Create Issue</button> -->

					<div>
						<input type="text" v-model="taskTitle" />
						<button @click="createTask()">New kaolo task</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
