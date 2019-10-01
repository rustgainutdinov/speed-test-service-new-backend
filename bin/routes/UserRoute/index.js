"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const login_1 = require("./login");
const getUserDataByToken_1 = require("./getUserDataByToken");
const subscribeToDomain_1 = require("./subscribeToDomain");
const unscribeToDomain_1 = require("./unscribeToDomain");
const getUserSubscriptionsRoute_1 = require("./getUserSubscriptionsRoute");
const UserRoute = {
    createRouter(router) {
        return router()
            .post('/create', create_1.default)
            .get('/login', login_1.default)
            .get('/get_data_by_token', getUserDataByToken_1.default)
            .post('/subscribe_to_domain', subscribeToDomain_1.default)
            .post('/unsubscribe_to_domain', unscribeToDomain_1.default)
            .get('/get_user_subscriptions', getUserSubscriptionsRoute_1.default);
    }
};
exports.default = UserRoute;
