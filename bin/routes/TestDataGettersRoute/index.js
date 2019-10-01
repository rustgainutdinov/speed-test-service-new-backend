"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPerformanceDataForLastWeek_1 = require("./getPerformanceDataForLastWeek");
const getPerformanceDataByUrlAndDate_1 = require("./getPerformanceDataByUrlAndDate");
const TestDataGettersRoute = {
    createRouter(router) {
        return router()
            .get('/get_performance_data_for_last_week', getPerformanceDataForLastWeek_1.default)
            .get('/get_performance_data_by_url_and_date', getPerformanceDataByUrlAndDate_1.default);
    }
};
exports.default = TestDataGettersRoute;
