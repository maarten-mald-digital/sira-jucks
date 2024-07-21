import { Model } from 'pinia-orm';
import Project from '@/models/Project';
import Task from '@/models/Task';

export default class Sprint extends Model {
	static entity = 'sprints';

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
			project_id: this.number(null),
			title: this.string(''),
			project: this.belongsTo(Project, 'project_id', 'id'),
			tasks: this.hasMany(Task, 'sprint_id', 'id'),
			created_at: this.string(null),
			updated_at: this.string(null),
		};
	}

	// For typescript support of the field include also the next lines
	declare id: number;
	declare project_id: number;
	declare title: string;
	declare created_at: string;
	declare updated_at: string;
}
