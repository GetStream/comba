import mongoose, { Schema } from 'mongoose';
import findOneOrCreate from 'mongoose-findoneorcreate';
import query from 'mongoose-string-query';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';

export const AgentSchema = new Schema(
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
			unique: true,
			required: true,
		},
		organization: {
			type: Schema.Types.ObjectId,
			ref: 'Organization',
			required: true,
			autopopulate: true,
		},
		password: {
			type: String,
			required: true,
			bcrypt: true,
		},
		recovery: {
			type: String,
			default: '',
		},
	},
	{
		collection: 'agents',
	}
);

AgentSchema.plugin(findOneOrCreate);
AgentSchema.plugin(bcrypt);
AgentSchema.plugin(timestamps);
AgentSchema.plugin(query);
AgentSchema.plugin(autopopulate);

AgentSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Agent', AgentSchema);
