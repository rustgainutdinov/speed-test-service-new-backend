"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const criticalIndicatorChange_1 = require("../../constants/speedTest/criticalIndicatorChange");
const criticalPerformanceChange_1 = require("../../constants/speedTest/criticalPerformanceChange");
function matchIndicatorsOnFall(standardIndicators, actualIndicators) {
    let fallenIndicatorsData = [];
    if (!actualIndicators) {
        return [];
    }
    for (let indicator in standardIndicators) {
        const standardIndicator = standardIndicators[indicator].value;
        let actualIndicator;
        actualIndicators.forEach((item) => {
            if (indicator === item.indicator) {
                actualIndicator = item.value;
            }
        });
        let fallenIndicator;
        if (!standardIndicator || !actualIndicator) {
            continue;
        }
        console.log(standardIndicator, actualIndicator, indicator);
        if ((indicator === 'performance' && (standardIndicator - actualIndicator) > criticalPerformanceChange_1.default)
            || (standardIndicator - actualIndicator) > criticalIndicatorChange_1.default) {
            fallenIndicator = {
                change: Math.round((standardIndicator - actualIndicator) * 100),
                before: Math.round(standardIndicator * 100),
                after: Math.round(actualIndicator * 100),
                indicator
            };
        }
        if (fallenIndicator) {
            fallenIndicatorsData.push(fallenIndicator);
        }
    }
    return fallenIndicatorsData;
}
exports.default = matchIndicatorsOnFall;
