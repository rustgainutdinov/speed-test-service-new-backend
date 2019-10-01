"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
const Url_1 = require("../../classes/Url");
function getSelectedIndicatorsByDateRoute(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['token', 'url', 'startDate', 'endDate', 'indicators']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    const url = new Url_1.default(queryData.url);
    url.getSelectedIndicatorsByDate(user, queryData.startDate, queryData.endDate, JSON.parse(queryData.indicators), (result) => {
        res.json(result);
    }, next);
}
exports.default = getSelectedIndicatorsByDateRoute;
