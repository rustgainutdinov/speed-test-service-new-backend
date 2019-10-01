"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../../App");
const sortTestDataByDomainAndMode_1 = require("../testDataSort/sortTestDataByDomainAndMode");
const getTheMostLowerIndicatorAtDay_1 = require("../testDataSort/getTheMostLowerIndicatorAtDay");
function getPerformanceDataForLastWeek(user, onSuccess, onError) {
    App_1.default.getDBInstance().execute('get_performance_data_for_last_week', null, (performanceData) => {
        const testDataWithTheMostLowerIndicator = getTheMostLowerIndicatorAtDay_1.default(performanceData);
        const sortedByDomainAndModeTestData = sortTestDataByDomainAndMode_1.default(testDataWithTheMostLowerIndicator);
        onSuccess(sortedByDomainAndModeTestData);
    }, onError, user);
}
exports.default = getPerformanceDataForLastWeek;
