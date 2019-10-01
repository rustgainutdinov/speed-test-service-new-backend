import ITestData from "../../interfaces/testData/ITestData";
import ISortedByDomainTestData from "../../interfaces/testData/ISortedByDomainTestData";

function sortTestDataByDomain(testDataList: Array<ITestData>): ISortedByDomainTestData {
    let sortedData: ISortedByDomainTestData = {};
    testDataList.forEach((testData: ITestData) => {
        if (!sortedData[testData.domain]) {
            sortedData[testData.domain] = []
        }
        sortedData[testData.domain].push(testData);
    });
    return sortedData
}

export default sortTestDataByDomain