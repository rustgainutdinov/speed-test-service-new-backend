"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTokenByAppKey_1 = require("./getTokenByAppKey");
const saveTestingData_1 = require("./saveTestingData");
const testAllUrls_1 = require("./testAllUrls");
const testUrlsList_1 = require("./testUrlsList");
const TestingServerRoute = {
    createRouter(router) {
        return router()
            .get('/get_token_by_app_key', getTokenByAppKey_1.default)
            .post('/save_testing_data', saveTestingData_1.default)
            .post('/test_all_urls', testAllUrls_1.default)
            .post('/test_urls_list', testUrlsList_1.default);
    }
};
exports.default = TestingServerRoute;
