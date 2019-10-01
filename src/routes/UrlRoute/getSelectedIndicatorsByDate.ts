import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import Url from "../../classes/Url";
import ISortedByModeTestData from "../../interfaces/testData/ISortedByModeTestData";

function getSelectedIndicatorsByDateRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token', 'url', 'startDate', 'endDate', 'indicators']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    const url: Url = new Url(queryData.url);
    url.getSelectedIndicatorsByDate(user, queryData.startDate, queryData.endDate, JSON.parse(queryData.indicators), (result: ISortedByModeTestData) => {
        res.json(result);
    }, next)
}

export default getSelectedIndicatorsByDateRoute