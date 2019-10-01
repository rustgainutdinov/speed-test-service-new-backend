"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sortTestDataByDomain(testDataList) {
    let sortedData = {};
    testDataList.forEach((testData) => {
        if (!sortedData[testData.domain]) {
            sortedData[testData.domain] = [];
        }
        sortedData[testData.domain].push(testData);
    });
    return sortedData;
}
exports.default = sortTestDataByDomain;
