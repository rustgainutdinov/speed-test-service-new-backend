"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const Url_1 = require("../../classes/Url");
function getFallenIndicatorsRoute(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['url', 'startDate', 'endDate']);
    }
    catch (e) {
        next(e);
        return;
    }
    const url = new Url_1.default(queryData.url);
    url.getFallenIndicators(queryData.startDate, queryData.endDate, (result) => {
        res.json(result);
    }, next);
}
exports.default = getFallenIndicatorsRoute;
