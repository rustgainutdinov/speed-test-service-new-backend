"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sortTestDataByMode(testDataList) {
    let sortedData = {};
    testDataList.forEach((testData) => {
        if (!sortedData[testData.mode]) {
            sortedData[testData.mode] = [];
        }
        sortedData[testData.mode].push(testData);
    });
    return sortedData;
}
exports.default = sortTestDataByMode;
