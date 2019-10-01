import ITestData from "../../interfaces/testData/ITestData";
import IIndicatorsValueMap from "../../interfaces/testData/IIndicatorsValueMap";

function getMiddleIndicatorsForPeriod(indicatorsList: Array<ITestData>): IIndicatorsValueMap {
    let middleIndicatorsMap: IIndicatorsValueMap = {};
    if (!indicatorsList) {
        return {}
    }
    indicatorsList.forEach((indicatorData: ITestData) => {
        if (!middleIndicatorsMap[indicatorData.indicator]) {
            middleIndicatorsMap[indicatorData.indicator] = {sum: 0, quantity: 0, value: 0};
        }
        const sum: number = middleIndicatorsMap[indicatorData.indicator].sum += indicatorData.value;
        const quantity: number = middleIndicatorsMap[indicatorData.indicator].quantity += 1;
        middleIndicatorsMap[indicatorData.indicator].value = sum / quantity;
    });
    return middleIndicatorsMap
}

export default getMiddleIndicatorsForPeriod