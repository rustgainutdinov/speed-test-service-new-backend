import ITestData from "../../interfaces/testData/ITestData";
import ISortedByDomainTestData from "../../interfaces/testData/ISortedByDomainTestData";
import ISortedByDomainAndModeTestData from "../../interfaces/testData/ISorterByDomainAndModeTestData";
import sortTestDataByDomain from "./sortByDeviceByDomain";
import sortTestDataByMode from "./sortByDeviceByMode";

function sortTestDataByDomainAndMode(testDataList: Array<ITestData>): ISortedByDomainAndModeTestData {
    const sortedByDomainTestData: ISortedByDomainTestData = sortTestDataByDomain(testDataList);
    let sortedByDomainAndModeTestData: ISortedByDomainAndModeTestData = {};
    for (let domain in sortedByDomainTestData) {
        sortedByDomainAndModeTestData[domain] = sortTestDataByMode(sortedByDomainTestData[domain]);
    }
    return sortedByDomainAndModeTestData
}

export default sortTestDataByDomainAndMode