"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
const Domain_1 = require("../../classes/Domain");
function changeDomainPriorityRoute(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['token', 'domainsList']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    Domain_1.default.changeDisplayPriority(user, JSON.parse(queryData.domainsList), () => {
        res.json('Ok');
    }, next);
}
exports.default = changeDomainPriorityRoute;
