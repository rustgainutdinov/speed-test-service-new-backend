"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
const TestingServer_1 = require("../../classes/TestingServer");
function testUrlsList(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['token', 'list_of_urls']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    TestingServer_1.default.testUrlsList(user, JSON.parse(queryData.list_of_urls), () => {
        res.json('Ok');
    }, next);
}
exports.default = testUrlsList;
