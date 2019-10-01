"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
const getPerformanceByUrlAndDate_1 = require("../../methods/testDataGetters/getPerformanceByUrlAndDate");
function getPerformanceDataByUrlAndDateRoute(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['token', 'urls', 'startDate', 'endDate']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    getPerformanceByUrlAndDate_1.default(user, queryData.urls, queryData.startDate, queryData.endDate, (sortedByModeTestData) => {
        res.json(sortedByModeTestData);
    }, next);
}
exports.default = getPerformanceDataByUrlAndDateRoute;
