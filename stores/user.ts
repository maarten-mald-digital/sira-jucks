import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			user: {
				id: 1,
				title: 'Maarten Stolk',
			},
			projects: [
				{
					id: 1,
					title: 'project maarten 123',
					created_at: '2024-05-25T14:11:27.000000Z',
					updated_at: '2024-06-02T08:06:44.000000Z',
				},
				{
					id: 2,
					title: 'Project 2',
					created_at: '2024-05-25T12:38:19.000000Z',
					updated_at: '2024-05-29T20:01:18.000000Z',
				},
				{
					id: 3,
					title: 'Project 3',
					created_at: '2024-05-25T12:38:25.000000Z',
					updated_at: '2024-05-25T12:38:25.000000Z',
				},
			],
		};
	},
	actions: {
		refresh() {
			console.log('refresh()');
			this.fetchProjects();
		},

		async fetchProjects() {
			console.log('fetchProjects()');

			const { data: projects } = await useFetch(
				'https://sira-jucks-api.test/api/projects'
			)
				.then((result) => {
					console.log('then');
					console.log(result);
					// this.projects = projects.value;
				})
				.catch((error) => {
					console.log('katch');
					console.log(error);
				});

			console.log(projects);

			// this.projects = projects.value;
		},

		// async fetchAll() {
		// 	console.log('fetching!');
		// 	const { $fetch } = useNuxtApp();
		// 	const result = await useFetch(
		// 		'https://sira-jucks-api.test/api/projects'
		// 	);
		// 	console.log(result);
		// },
	},
});
