"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
function subscribeToDomainRoute(req, res, next) {
    const reqParams = req.query;
    try {
        checkOnParamsExists_1.default(reqParams, ['token', 'domain']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(reqParams.token);
    user.subscribeToDomain(reqParams.domain, () => {
        res.json('Ok');
    }, next);
}
exports.default = subscribeToDomainRoute;
