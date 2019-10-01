"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTheMostLowerIndicatorAtDay(testDataList) {
    let testDataWithLowerIndicatorsList = [];
    testDataList.forEach((testData) => {
        let isItemWithSameUrlAndModeAndDateExists = false;
        testDataWithLowerIndicatorsList.forEach((testDataWithLowerIndicators) => {
            if (testDataWithLowerIndicators.indicator === testData.indicator
                && testDataWithLowerIndicators.url === testData.url
                && testDataWithLowerIndicators.mode === testData.mode
                && testDataWithLowerIndicators.date === testData.date) {
                isItemWithSameUrlAndModeAndDateExists = true;
                if (testDataWithLowerIndicators.value > testData.value) {
                    testDataWithLowerIndicators = testData;
                }
            }
        });
        if (!isItemWithSameUrlAndModeAndDateExists) {
            testDataWithLowerIndicatorsList.push(testData);
        }
    });
    return testDataWithLowerIndicatorsList;
}
exports.default = getTheMostLowerIndicatorAtDay;
