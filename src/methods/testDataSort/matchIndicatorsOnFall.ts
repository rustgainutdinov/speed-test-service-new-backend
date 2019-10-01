import IIndicatorsValueMap from "../../interfaces/testData/IIndicatorsValueMap";
import ITestData from "../../interfaces/testData/ITestData";
import IChangedIndicator from "./IChangedIndicator";
import CRITICAL_INDICATOR_CHANGE from "../../constants/speedTest/criticalIndicatorChange";
import CRITICAL_PERFORMANCE_CHANGE from "../../constants/speedTest/criticalPerformanceChange";

function matchIndicatorsOnFall(standardIndicators: IIndicatorsValueMap, actualIndicators: Array<ITestData>): Array<IChangedIndicator> {
    let fallenIndicatorsData: Array<IChangedIndicator> = [];
    if (!actualIndicators) {
        return []
    }
    for (let indicator in standardIndicators) {
        const standardIndicator: number = standardIndicators[indicator].value;
        let actualIndicator: number;
        actualIndicators.forEach((item: ITestData) => {
            if (indicator === item.indicator) {
                actualIndicator = item.value;
            }
        });
        let fallenIndicator: IChangedIndicator;
        if (!standardIndicator || !actualIndicator) {
            continue
        }
        console.log(standardIndicator, actualIndicator, indicator);
        if ((indicator === 'performance' && (standardIndicator - actualIndicator) > CRITICAL_PERFORMANCE_CHANGE)
            || (standardIndicator - actualIndicator) > CRITICAL_INDICATOR_CHANGE) {
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
    return fallenIndicatorsData
}

export default matchIndicatorsOnFall