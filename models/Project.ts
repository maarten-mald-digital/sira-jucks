import { Model } from 'pinia-orm';

export default class Project extends Model {
	static entity = 'projects';

	// List of all fields (schema) of the post model. `this.string()` declares
	// a string field type with a default value as the first argument.
	// `this.uid()` declares a unique id if none provided.
	static fields() {
		return {
			id: this.uid(),
			title: this.string(''),
			createdAt: this.attr(null),
			updatedAt: this.attr(null),
		};
	}

	// For typescript support of the field include also the next lines
	declare id: string;
	declare title: string;
}
