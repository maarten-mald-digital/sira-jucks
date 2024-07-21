import { Model } from 'pinia-orm';
import Project from '@/models/Project';
import Sprint from '@/models/Sprint';

export default class Task extends Model {
	static entity = 'tasks';

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
			sprint_id: this.number(null),
			title: this.string(''),
			project: this.belongsTo(Project, 'project_id', 'id'),
			sprint: this.belongsTo(Sprint, 'sprint_id', 'id'),
			created_at: this.string(null),
			updated_at: this.string(null),
		};
	}

	// For typescript support of the field include also the next lines
	declare id: number;
	declare project_id: number;
	declare sprint_id: null | number;
	declare title: string;
	declare created_at: string;
	declare updated_at: string;
}
