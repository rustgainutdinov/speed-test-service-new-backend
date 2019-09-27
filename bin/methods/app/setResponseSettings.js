"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setResponseSettings(req, res, next) {
    res.contentType('application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}
exports.default = setResponseSettings;
