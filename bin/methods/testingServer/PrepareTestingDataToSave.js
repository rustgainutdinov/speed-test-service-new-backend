"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auditIndicators_1 = require("../../constants/speedTest/auditIndicators");
function prepareTestingDataToSave(receivedTestingData, token, idTest) {
    let testingDataToSave = [];
    receivedTestingData.forEach((item) => {
        for (let indicator in item) {
            if (auditIndicators_1.default.indexOf(indicator) !== -1) {
                testingDataToSave.push({
                    idTest,
                    token,
                    indicator,
                    url: item.url,
                    mode: item.mode,
                    value: item[indicator]
                });
            }
        }
    });
    return testingDataToSave;
}
exports.default = prepareTestingDataToSave;
