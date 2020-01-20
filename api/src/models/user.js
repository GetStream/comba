import mongoose, { Schema } from 'mongoose';
import findOneOrCreate from 'mongoose-findoneorcreate';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';

export const UserSchema = new Schema(
	{
		name: {
			first: {
				type: String,
				trim: true,
				required: true,
			},
			last: {
				type: String,
				trim: true,
				required: true,
			},
		},
		email: {
			type: String,
			lowercase: true,
			trim: true,
			required: true,
		},
		organization: {
			type: Schema.Types.ObjectId,
			ref: 'Organization',
			required: true,
			autopopulate: true,
		},
		enriched: {
			type: Schema.Types.Mixed,
			default: {},
		},
	},
	{
		collection: 'users',
	}
);

UserSchema.plugin(findOneOrCreate);
UserSchema.plugin(timestamps);
UserSchema.plugin(query);
UserSchema.plugin(autopopulate);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('User', UserSchema);
