"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
function comparePass(pass, hash) {
    let comparedResult;
    try {
        comparedResult = bcrypt.compareSync(pass, hash);
    }
    catch (e) {
        throw e;
    }
    return comparedResult;
}
exports.default = comparePass;
