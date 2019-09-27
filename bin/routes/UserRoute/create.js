"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../classes/User");
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
function createUserRoute(req, res, next) {
    const userData = req.query;
    try {
        checkOnParamsExists_1.default(userData, ['email', 'pass', 'name']);
    }
    catch (e) {
        next(e);
        return;
    }
    User_1.default.create(userData, (user) => {
        user.login((dataToAuth) => {
            res.json(dataToAuth);
        }, next);
    }, next);
}
exports.default = createUserRoute;
