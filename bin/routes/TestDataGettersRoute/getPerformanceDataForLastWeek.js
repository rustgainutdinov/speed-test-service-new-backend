"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
const getPerformanceDataForLastWeek_1 = require("../../methods/testDataGetters/getPerformanceDataForLastWeek");
function getPerformanceDataForLastWeekRoute(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['token']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    getPerformanceDataForLastWeek_1.default(user, (performanceTestData) => {
        res.json(performanceTestData);
    }, next);
}
exports.default = getPerformanceDataForLastWeekRoute;
