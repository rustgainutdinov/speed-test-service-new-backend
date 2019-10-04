"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const User_1 = require("../../classes/User");
const Url_1 = require("../../classes/Url");
const TestingServer_1 = require("../../classes/TestingServer");
function testAllUrls(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['token']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    Url_1.default.getAllUrls((urlsList) => {
        TestingServer_1.default.testUrlsList(user, urlsList, () => {
            res.json('Ok');
        }, next);
    }, next);
}
exports.default = testAllUrls;
