"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const requestIp = require("request-ip");
const TestingServer_1 = require("../../classes/TestingServer");
function getTokenByAppKey(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['key']);
    }
    catch (e) {
        next(e);
        return;
    }
    const ip = requestIp.getClientIp(req);
    const testingServer = new TestingServer_1.default(ip);
    testingServer.getToken(queryData.key, (token) => {
        res.json(token);
    }, next);
}
exports.default = getTokenByAppKey;
