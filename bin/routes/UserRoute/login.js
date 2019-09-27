"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
function loginUserRoute(req, res, next) {
    const userData = req.query;
    try {
        checkOnParamsExists_1.default(userData, ['email', 'pass']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(undefined, userData.email, userData.pass);
    user.login((dataToAuth) => {
        res.json(dataToAuth);
    }, next);
}
exports.default = loginUserRoute;
