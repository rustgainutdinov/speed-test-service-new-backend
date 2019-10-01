import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import getPerformanceDataForLastWeek from "../../methods/testDataGetters/getPerformanceDataForLastWeek";
import ISortedByDomainAndModeTestData from "../../interfaces/testData/ISorterByDomainAndModeTestData";

function getPerformanceDataForLastWeekRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    getPerformanceDataForLastWeek(user, (performanceTestData: ISortedByDomainAndModeTestData) => {
        res.json(performanceTestData);
    }, next);
}

export default getPerformanceDataForLastWeekRoute