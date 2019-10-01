"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOnParamsExists_1 = require("../../middleware/checkOnParamsExists");
const Url_1 = require("../../classes/Url");
const User_1 = require("../../classes/User");
function createUrlRoute(req, res, next) {
    const queryData = req.query;
    try {
        checkOnParamsExists_1.default(queryData, ['token', 'domainName', 'urlName', 'isFavourite']);
    }
    catch (e) {
        next(e);
        return;
    }
    const user = new User_1.default(queryData.token);
    Url_1.default.create(queryData, user, () => {
        res.json('Ok');
    }, next);
}
exports.default = createUrlRoute;
