"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const comparePass_1 = require("../methods/crypt/comparePass");
const generateGUID = require("uuid/v4");
const prepareTestingDataToSave_1 = require("../methods/testingServer/prepareTestingDataToSave");
const PageSpeedTest_1 = require("./PageSpeedTest");
const axios_1 = require("axios");
class TestingServer {
    constructor(ip, token) {
        this.ip = ip;
        this.token = token;
    }
    static testUrlsList(user, urlsList, onSuccess, onError) {
        let urlNameAndModeList = [];
        urlsList.forEach((urlData) => {
            urlNameAndModeList.push({ name: urlData.name, mode: 'mobile' });
            urlNameAndModeList.push({ name: urlData.name, mode: 'desktop' });
        });
        PageSpeedTest_1.default.create(user, (idTest) => {
            axios_1.default.post('http://localhost:3080/test/list_of_urls', null, {
                params: {
                    list_of_urls: JSON.stringify(urlNameAndModeList),
                    id_test: idTest
                }
            }).then((result) => {
                onSuccess(result.data);
            }).catch((e) => {
                console.log('req error');
                onError(e);
            });
        }, onError);
    }
    getToken(appKey, onSuccess, onError) {
        this.getInfo((testingServerInfo) => {
            let areKeysEqual;
            try {
                areKeysEqual = comparePass_1.default(appKey, testingServerInfo.key_hash);
            }
            catch (e) {
                onError(e);
                return;
            }
            if (areKeysEqual) {
                const token = generateGUID();
                App_1.default.getDBInstance().execute('set_speed_test_service_token', { ip: this.ip, token }, () => {
                    onSuccess(token);
                }, onError);
            }
            else {
                onError(new Error('Key does not fit'));
            }
        }, onError);
    }
    getInfo(onSuccess, onError) {
        App_1.default.getDBInstance().execute('get_speed_test_service_info_by_ip', { ip: this.ip }, (result) => {
            try {
                onSuccess(result[0]);
            }
            catch (e) {
                onError(new Error('Service is not found'));
            }
        }, onError);
    }
    saveTestingData(data, token, idTest, onSuccess, onError) {
        const testingDataToSave = prepareTestingDataToSave_1.default(data, token, idTest);
        App_1.default.getDBInstance().execute('save_testing_data', { data: testingDataToSave }, onSuccess, onError);
    }
}
exports.default = TestingServer;
