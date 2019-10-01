"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../../App");
const getTheMostLowerIndicatorAtDay_1 = require("../testDataSort/getTheMostLowerIndicatorAtDay");
const sortByDeviceByMode_1 = require("../testDataSort/sortByDeviceByMode");
function getPerformanceDataByUrlAndDate(user, urls, startDate, endDate, onSuccess, onError) {
    App_1.default.getDBInstance().execute('get_performance_by_url_and_date', {
        urls,
        startDate,
        endDate
    }, (testDataList) => {
        const testDataWithTheMostLowerIndicator = getTheMostLowerIndicatorAtDay_1.default(testDataList);
        const sortedByModeTestData = sortByDeviceByMode_1.default(testDataWithTheMostLowerIndicator);
        onSuccess(sortedByModeTestData);
    }, onError, user);
}
exports.default = getPerformanceDataByUrlAndDate;
