"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMiddleIndicatorsForPeriod(indicatorsList) {
    let middleIndicatorsMap = {};
    if (!indicatorsList) {
        return {};
    }
    indicatorsList.forEach((indicatorData) => {
        if (!middleIndicatorsMap[indicatorData.indicator]) {
            middleIndicatorsMap[indicatorData.indicator] = { sum: 0, quantity: 0, value: 0 };
        }
        const sum = middleIndicatorsMap[indicatorData.indicator].sum += indicatorData.value;
        const quantity = middleIndicatorsMap[indicatorData.indicator].quantity += 1;
        middleIndicatorsMap[indicatorData.indicator].value = sum / quantity;
    });
    return middleIndicatorsMap;
}
exports.default = getMiddleIndicatorsForPeriod;
