"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
const Domain_1 = require("../../classes/Domain");
function removeDomainRoute(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['domain', 'token']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    const domain = new Domain_1.default(queryData.domain);
    domain.remove(user, () => {
        res.json('Ok');
    }, next);
}
exports.default = removeDomainRoute;
