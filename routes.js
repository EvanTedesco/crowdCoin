const routes = require('next-routes')();

routes.add('/campaigns/new', 'campaigns/new');
routes.add('/campaigns/:address', '/campaigns/show');
routes.add('/campaigns', '/');
module.exports = routes;