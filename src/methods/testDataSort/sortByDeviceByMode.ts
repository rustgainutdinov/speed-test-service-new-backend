import ITestData from "../../interfaces/testData/ITestData";
import ISortedByModeTestData from "../../interfaces/testData/ISortedByModeTestData";

function sortTestDataByMode(testDataList: Array<ITestData>): ISortedByModeTestData {
    let sortedData: ISortedByModeTestData = {};
    testDataList.forEach((testData: ITestData) => {
        if (!sortedData[testData.mode]) {
            sortedData[testData.mode] = []
        }
        sortedData[testData.mode].push(testData);
    });
    return sortedData
}

export default sortTestDataByMode