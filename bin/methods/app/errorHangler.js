"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    res.status(500).json(err.message);
}
exports.default = errorHandler;
