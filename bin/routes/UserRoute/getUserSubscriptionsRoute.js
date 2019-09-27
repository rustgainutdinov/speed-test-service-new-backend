"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
function getUserSubscriptionsRoute(req, res, next) {
    const reqParams = req.query;
    try {
        checkOnParamsExists_1.default(reqParams, ['token']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(reqParams.token);
    user.getDomainsSubscriptions((userSubscriptions) => {
        res.json(userSubscriptions);
    }, next);
}
exports.default = getUserSubscriptionsRoute;
