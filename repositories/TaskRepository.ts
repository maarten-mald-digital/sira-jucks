import Task from '~/models/Task';

const apiBaseUrl = `http://api.sirajucks.test`;

export class TaskRepository {
	// static async fetchAll() {
	// 	try {
	// 		const response = await $fetch(`${apiBaseUrl}/api/projects`, {
	// 			method: 'GET',
	// 			withCredentials: true,
	// 			credentials: 'include',
	// 			headers: {
	// 				'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
	// 			},
	// 		});

	// 		console.log('response');
	// 		console.log(response);

	// 		useRepo(Project).save(response);
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

	// static all() {
	// 	return useRepo(Project).all();
	// }

	static async create(data: object) {
		console.log('create');

		try {
			const response = await $fetch(`${apiBaseUrl}/api/tasks`, {
				method: 'POST',
				withCredentials: true,
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
				body: data,
			});

			useRepo(Task).save(response);
		} catch (e) {
			console.log(e);
		}
	}

	// static async update(id: number, data: object) {
	static async update(id: null | number, data: Task) {
		console.log('update task');
		console.log(id, data);

		try {
			const response = await $fetch(`${apiBaseUrl}/api/tasks/${id}`, {
				method: 'PATCH',
				withCredentials: true,
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
				body: data,
			});

			useRepo(Task).save({ id, ...data });
		} catch (e) {
			console.log(e);
		}
	}

	// static async delete(id: number) {
	// 	try {
	// 		const response = await $fetch(`${apiBaseUrl}/api/projects/${id}`, {
	// 			method: 'DELETE',
	// 			withCredentials: true,
	// 			credentials: 'include',
	// 			headers: {
	// 				'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
	// 			},
	// 		});

	// 		useRepo(Project).destroy(id);
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }
}
