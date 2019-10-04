import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import Url from "../../classes/Url";
import IUrlChangedIndicators from "../../interfaces/testData/IUrlChangedIndicators";

function getFallenIndicatorsRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['url', 'startDate', 'endDate']);
    } catch (e) {
        next(e);
        return
    }
    const url: Url = new Url(queryData.url);
    url.getFallenIndicators(queryData.startDate, queryData.endDate, (result: IUrlChangedIndicators) => {
        res.json(result);
    }, next);
}

export default getFallenIndicatorsRoute