import User from "../../classes/User";
import App from "../../App";
import ITestData from "../../interfaces/testData/ITestData";
import getTheMostLowerIndicatorAtDay from "../testDataSort/getTheMostLowerIndicatorAtDay";
import ISortedByModeTestData from "../../interfaces/testData/ISortedByModeTestData";
import sortTestDataByMode from "../testDataSort/sortByDeviceByMode";

function getPerformanceDataByUrlAndDate(user: User, urls: Array<string>, startDate: string, endDate: string, onSuccess: Function, onError: Function) {
    App.getDBInstance().execute('get_performance_by_url_and_date', {
        urls,
        startDate,
        endDate
    }, (testDataList: Array<ITestData>) => {
        const testDataWithTheMostLowerIndicator = getTheMostLowerIndicatorAtDay(testDataList);
        console.log(testDataList);
        console.log(testDataWithTheMostLowerIndicator);
        const sortedByModeTestData: ISortedByModeTestData = sortTestDataByMode(testDataWithTheMostLowerIndicator);
        onSuccess(sortedByModeTestData);
    }, onError, user);
}

export default getPerformanceDataByUrlAndDate