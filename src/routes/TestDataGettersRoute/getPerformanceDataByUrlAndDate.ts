import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import getPerformanceDataByUrlAndDate from "../../methods/testDataGetters/getPerformanceByUrlAndDate";
import ISortedByModeTestData from "../../interfaces/testData/ISortedByModeTestData";

function getPerformanceDataByUrlAndDateRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token', 'urls', 'startDate', 'endDate']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    getPerformanceDataByUrlAndDate(user, queryData.urls, queryData.startDate, queryData.endDate, (sortedByModeTestData: ISortedByModeTestData) => {
        res.json(sortedByModeTestData);
    }, next);
}

export default getPerformanceDataByUrlAndDateRoute