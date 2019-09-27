"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
function getUserDataByTokenRoute(req, res, next) {
    const userData = req.query;
    try {
        checkOnParamsExists_1.default(userData, ['token']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(userData.token);
    user.getPublicUserDataByToken((publicUserData) => {
        res.json(publicUserData);
    }, next);
}
exports.default = getUserDataByTokenRoute;
