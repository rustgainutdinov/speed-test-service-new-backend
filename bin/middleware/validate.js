"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkOnParamsExist(data, paramsList) {
    paramsList.forEach((param) => {
        if (!data[param]) {
            throw new Error('Param ' + param + ' is required');
        }
    });
}
exports.default = checkOnParamsExist;
