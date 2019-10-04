"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const generateGUID = require("uuid/v4");
class PageSpeedTest {
    constructor(idTest) {
        this.idTest = idTest;
    }
    static create(user, onSuccess, onError) {
        const idTest = generateGUID();
        App_1.default.getDBInstance().execute('add_new_test', { idTest }, () => {
            onSuccess(idTest);
        }, onError);
    }
    getTestingUrlsByTestId(onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_urls_name_by_test_id', { idTest: this.idTest }, onSuccess, onError);
    }
}
exports.default = PageSpeedTest;
