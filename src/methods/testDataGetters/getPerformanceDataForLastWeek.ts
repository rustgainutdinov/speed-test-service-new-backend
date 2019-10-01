import User from "../../classes/User";
import App from "../../App";
import ITestData from "../../interfaces/testData/ITestData";
import ISortedByDomainAndModeTestData from "../../interfaces/testData/ISorterByDomainAndModeTestData";
import sortTestDataByDomainAndMode from "../testDataSort/sortTestDataByDomainAndMode";
import getTheMostLowerIndicatorAtDay from "../testDataSort/getTheMostLowerIndicatorAtDay";

function getPerformanceDataForLastWeek(user: User, onSuccess: Function, onError: Function) {
    App.getDBInstance().execute('get_performance_data_for_last_week', null, (performanceData: Array<ITestData>) => {
        const testDataWithTheMostLowerIndicator = getTheMostLowerIndicatorAtDay(performanceData);
        const sortedByDomainAndModeTestData: ISortedByDomainAndModeTestData = sortTestDataByDomainAndMode(testDataWithTheMostLowerIndicator);
        onSuccess(sortedByDomainAndModeTestData);
    }, onError, user);
}

export default getPerformanceDataForLastWeek