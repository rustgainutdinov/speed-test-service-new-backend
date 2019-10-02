import ITestData from "../../interfaces/testData/ITestData";

function getTheMostLowerIndicatorAtDay(testDataList: Array<ITestData>): Array<any> {
    let testDataWithLowerIndicatorsList: Array<ITestData> = [];
    testDataList.forEach((testData: ITestData) => {
        let isItemWithSameUrlAndModeAndDateExists: boolean = false;
        testDataWithLowerIndicatorsList.forEach((testDataWithLowerIndicators: ITestData) => {
            if (testDataWithLowerIndicators.indicator === testData.indicator
                && testDataWithLowerIndicators.url === testData.url
                && testDataWithLowerIndicators.mode === testData.mode
                && testDataWithLowerIndicators.date.toString() === testData.date.toString()) {
                isItemWithSameUrlAndModeAndDateExists = true;
                if (testDataWithLowerIndicators.value > testData.value) {
                    testDataWithLowerIndicators = testData;
                }
            }
        });
        if (!isItemWithSameUrlAndModeAndDateExists) {
            testDataWithLowerIndicatorsList.push(testData)
        }
    });
    return testDataWithLowerIndicatorsList
}

export default getTheMostLowerIndicatorAtDay