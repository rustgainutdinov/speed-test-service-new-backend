"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
const getInfoAboutUrlAndDomainForAdminPanel_1 = require("../../methods/pages/getInfoAboutUrlAndDomainForAdminPanel");
function getInfoAboutUrlAndDomainForAdminPanelRoute(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['token']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    getInfoAboutUrlAndDomainForAdminPanel_1.default(user, (data) => {
        res.json(data);
    }, next);
}
exports.default = getInfoAboutUrlAndDomainForAdminPanelRoute;
