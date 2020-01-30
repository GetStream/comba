import Queue from 'bull';
import { createClient } from 'workers/bull-redis';

const queue = new Queue('webhook-chat', {
	createClient,
	limiter: { max: 1000, duration: 60000 }, // Limit to 1000 job per minute
});

// type: added || removed || updated
export const AddToWebhookChatQueue = async (type, data = {}) => {
	return queue.add(type, data);
};

export default queue;
