import { defineStore } from 'pinia';

const apiBaseUrl = `http://api.sirajucks.test`;

interface Task {
	id: number;
	project_id: number;
	sprint_id: number;
	lane_id: number;
	title: string;
	created_at: string | null;
	updated_at: string | null;
}
interface Lane {
	id: number;
	project_id: number;
	title: string;
	created_at: string | null;
	updated_at: string | null;
}
interface Sprint {
	id: number;
	project_id: number;
	title: string;
	starts_at: string | null;
	ends_at: string | null;
	created_at: string | null;
	updated_at: string | null;
}
interface Project {
	id: number;
	title: string;
	sprints: Sprint[];
	lanes: Lane[];
	tasks: Task[];
	created_at: string | null;
	updated_at: string | null;
}

interface ProjectState {
	projects: Project[];
}

export const useProjectStore = defineStore('project', {
	state: (): ProjectState => {
		return {
			projects: [],
		};
	},

	persist: true,

	getters: {
		getProjectById: (state) => {
			return (id: number) =>
				state.projects.find((project) => project.id === id);
		},
	},

	actions: {
		async fetchProjects() {
			console.log('fetchProjects');

			await $fetch(`${apiBaseUrl}/api/projects`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
			})
				.then((response) => {
					console.log('then');
					console.log(response);

					this.projects = response;
				})
				.catch((e) => {
					console.log('fetchUser catch');
					console.log(e);
				});
		},

		async createProject(title: string) {
			console.log('createProject');
			console.log(title.title);

			await $fetch(`${apiBaseUrl}/api/projects`, {
				method: 'POST',
				withCredentials: true,
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
				body: {
					title: title,
				},
			})
				.then(async (response) => {
					console.log('then');
					console.log(response);

					await this.fetchProjects();

					navigateTo('/projects');
				})
				.catch((e) => {
					console.log('catch');
					console.log(e);
				});
		},

		async updateProject(data: object, id: number) {
			console.log('update');
			console.log(data);
			console.log(id);

			await $fetch(`${apiBaseUrl}/api/projects/${id}`, {
				method: 'PATCH',
				withCredentials: true,
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
				body: data,
			})
				.then(async (response) => {
					console.log('then');
					console.log(response);

					await this.fetchProjects();

					navigateTo('/projects');
				})
				.catch((e) => {
					console.log('catch');
					console.log(e);
				});
		},

		async deleteProject(id: number) {
			console.log('delete');
			console.log(id);

			await $fetch(`${apiBaseUrl}/api/projects/${id}`, {
				method: 'DELETE',
				withCredentials: true,
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
			})
				.then(async (response) => {
					console.log('then');
					console.log(response);

					await this.fetchProjects();
					navigateTo('/projects');
				})
				.catch((e) => {
					console.log('catch');
					console.log(e);
				});
		},
	},
});
