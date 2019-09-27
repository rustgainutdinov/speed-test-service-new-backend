"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
class Domain {
    constructor(name) {
        this.name = name;
    }
    static create(data, user, onSuccess, onError) {
        App_1.default.getDBInstance().execute('add_new_domain', data, () => {
            onSuccess(new Domain(data.name));
        }, onError, user);
    }
}
