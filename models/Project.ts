import { Model } from 'pinia-orm';
import Sprint from '@/models/Sprint';
import Task from '@/models/Task';

export default class Project extends Model {
	static entity = 'projects';

	/**
	 * Extra options for persisting to localStorage
	 */
	static piniaOptions = {
		persist: true,
	};

	/**
	 * List of all fields and relationships
	 */
	static fields() {
		return {
			id: this.uid(),
			title: this.string(''),
			sprints: this.hasMany(Sprint, 'project_id', 'id'),
			tasks: this.hasMany(Task, 'project_id', 'id'),
			created_at: this.string(null),
			updated_at: this.string(null),
		};
	}

	// For typescript support of the field include also the next lines
	declare id: number;
	declare title: string;
	declare created_at: string;
	declare updated_at: string;
}
