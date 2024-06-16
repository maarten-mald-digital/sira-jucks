<template>
	<div>
		<h1>Welcome to the homepage</h1>

		<hr />

		<h3>projects</h3>
		<pre>{{ projects }}</pre>
	</div>
</template>

<script lang="ts" setup>
const {
	data: projects,
	pending,
	error,
	refresh,
} = await useFetch('http://sira-jucks-api.test/api/projects');

console.log(projects);

// axios.get('/sanctum/csrf-cookie').then(response => {
//     // Login...
// });

// import User from '~/models/User';
// import Project from '~/models/Project';
// import { useAxiosRepo } from '@pinia-orm/axios';

// const store = useStore('user');
// console.log(store);

// const projects = await this.$ProjectRepository.getAllProjects();
// console.log(projects);

// const user = useUserStore();
// user.fetchProjects();

// const projects = user.projects;
// console.log(user.projects);

// await Project.api().get('https://sira-jucks-api.test/api/projects');
// const test = await useAxiosRepo(Project)
// 	.api()
// 	.get('https://sira-jucks-api.test/api/projects');
// console.log(test);

// useRepo(User).save({
// 	id: 2,
// 	title: 'Damian van Straatje',
// });
// const users = useRepo(User).all();

// const projects = useRepo(Project).all();

// await useAxiosRepo(Project)
// 	.api()
// 	.get('https://sira-jucks-api.test/api/projects');

// console.log(projects);

// useRepo(Project).save({
// 	id: 2,
// 	title: 'Project 2',
// });

// const projects = useRepo(Project).all();

// const test = useAxiosRepo(Project)
// 	.api()
// 	.get('https://sira-jucks-api.test/api/projects');
// console.log(test);

// const test2 = useAxiosRepo(Project)
// 	.api()
// 	.get('/api/projects', {
// 		headers: { 'X-Requested-With': 'XMLHttpRequest' },
// 		baseURL: 'https://sira-jucks-api.test/api/',
// 	});

// const test3 = useAxiosRepo(Project).api().fetch();
// console.log(test3);

// console.log(test2);

// console.log('hier');
// console.log(users);
// console.log(projects);
</script>
