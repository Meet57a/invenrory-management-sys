const { path } = require('../app');

const router = require('express').Router();

const routes = [
    {
        path: "/auth",
        router: require('./Auth.route')
    },
    {
        path: "/product",
        router: require('./Product.route')
    },
    {
        path: "/order",
        router: require('./orders.route')
    },
    {
        path: "/pdf",
        router: require('./pdf.route')
    },
   
];

routes.forEach((route) => {
    return router.use(route.path, route.router);
});

module.exports = router;