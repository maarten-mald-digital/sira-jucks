import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
	state: () => {
		return { projects: [] };
	},
	actions: {
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
