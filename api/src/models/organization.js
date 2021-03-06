import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

export const OrganizationSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		meta: {
			branding: {
				logo: {
					type: String,
					trim: true
				},
				colors: {
					primary: {
						type: String,
						trim: true
					},
					secondary: {
						type: String,
						trim: true
					}
				}
			},
			tagline: {
				type: String,
				trim: true,
				required: true
			}
		},
		phone: {
			number: {
				type: String,
				trim: true
			},
			display: {
				type: Boolean,
				default: false
			}
		},
		email: {
			address: {
				type: String,
				trim: true,
				required: true
			},
			display: {
				type: Boolean,
				default: true
			}
		},
		website: {
			url: {
				type: String,
				trim: true,
				required: true
			},
			display: {
				type: Boolean,
				default: true
			}
		},
		welcome: {
			message: {
				type: String,
				trim: true,
				default: 'Welcome! Type a message to get started and we will connect you with an available agent!'
			},
			enabled: {
				type: Boolean,
				default: false
			}
		},
		response: {
			type: String,
			enum: [
				'We typically reply in a few minutes.',
				'We typically reply in under 5 minutes.',
				'We typically reply in a few hours.',
				'We typically reply in a day.'
			],
			default: 'We typically reply in a few minutes.'
		},
		settings: {
			faqs: {
				type: Boolean,
				default: false
			},
			transcripts: {
				type: Boolean,
				default: true
			}
		},
		domains: [
			{
				url: {
					type: String,
					trim: true
				}
			}
		]
	},
	{
		collection: 'organizations'
	}
);

OrganizationSchema.plugin(timestamps);
OrganizationSchema.plugin(query);

OrganizationSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Organization', OrganizationSchema);
