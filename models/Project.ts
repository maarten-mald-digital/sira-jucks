import { Model } from 'pinia-orm';

export default class Project extends Model {
	static entity = 'projects';

	static fields() {
		return {
			id: this.uid(),
			title: this.string(''),
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
