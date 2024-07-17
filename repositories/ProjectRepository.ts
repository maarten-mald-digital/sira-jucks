import Project from '~/models/Project';

const apiBaseUrl = `http://api.sirajucks.test`;

export class ProjectRepository {
	static async fetchAll() {
		try {
			const response = await $fetch(`${apiBaseUrl}/api/projects`, {
				method: 'GET',
				withCredentials: true,
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
			});

			useRepo(Project).save(response);
		} catch (e) {
			console.log(e);
		}
	}

	static all() {
		return useRepo(Project).all();
	}

	static async create(data: object) {
		try {
			const response = await $fetch(`${apiBaseUrl}/api/projects`, {
				method: 'POST',
				withCredentials: true,
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
				body: data,
			});

			useRepo(Project).save(response);
		} catch (e) {
			console.log(e);
		}
	}

	static async update(id: number, data: object) {
		try {
			const response = await $fetch(`${apiBaseUrl}/api/projects/${id}`, {
				method: 'PATCH',
				withCredentials: true,
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
				body: data,
			});

			useRepo(Project).save({ id, ...data });
		} catch (e) {
			console.log(e);
		}
	}

	static async delete(id: number) {
		try {
			const response = await $fetch(`${apiBaseUrl}/api/projects/${id}`, {
				method: 'DELETE',
				withCredentials: true,
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
				},
			});

			useRepo(Project).destroy(id);
		} catch (e) {
			console.log(e);
		}
	}
}
