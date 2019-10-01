"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const requestIp = require("request-ip");
const TestingServer_1 = require("../../classes/TestingServer");
function saveTestingData(req, res, next) {
    const queryData = req.query;
    const bodyData = req.body;
    try {
        checkOnParamsExists_1.default(queryData, ['token', 'id_test']);
        checkOnParamsExists_1.default(bodyData, ['result']);
    }
    catch (e) {
        next(e);
        return;
    }
    const ip = requestIp.getClientIp(req);
    const testingServer = new TestingServer_1.default(ip);
    testingServer.saveTestingData(JSON.parse(bodyData.result), queryData.token, queryData.id_test, () => {
        res.json('Ok');
    }, next);
}
exports.default = saveTestingData;
