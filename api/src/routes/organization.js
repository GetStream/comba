import { get, list, post, update, destroy } from '../controllers/v1/organization';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/organizations').get(wrapAsync(list));
	api.route('/v1/organizations/:organization').get(wrapAsync(get));
	api.route('/v1/organizations/:organization').put(wrapAsync(update));
	api.route('/v1/organizations').post(wrapAsync(post));
	api.route('/v1/organizations/:organization').delete(wrapAsync(destroy));
};
