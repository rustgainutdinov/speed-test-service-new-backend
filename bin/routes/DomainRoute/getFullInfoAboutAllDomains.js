"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const Domain_1 = require("../../classes/Domain");
const User_1 = require("../../classes/User");
function getFullInfoAboutAllDomainsRoute(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['token']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    Domain_1.default.getFullInfoAboutAllDomains(user, (domainsData) => {
        res.json(domainsData);
    }, next);
}
exports.default = getFullInfoAboutAllDomainsRoute;
