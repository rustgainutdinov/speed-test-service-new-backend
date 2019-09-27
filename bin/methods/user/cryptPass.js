"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
function cryptPass(pass) {
    let hash;
    try {
        hash = bcrypt.hashSync(pass, 10);
    }
    catch (e) {
        throw e;
    }
    return hash;
}
exports.default = cryptPass;
