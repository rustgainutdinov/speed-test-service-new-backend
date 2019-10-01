import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import IUrlDataOnlyWithNameList from "../../interfaces/url/IUrlsDataOnlyWithNameList";
import Url from "../../classes/Url";
import TestingServer from "../../classes/TestingServer";

function testAllUrls(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    Url.getAllUrls(user, (urlsList: IUrlDataOnlyWithNameList) => {
        TestingServer.testUrlsList(user, urlsList, () => {
            res.json('Ok');
        }, next)
    }, next);
}

export default testAllUrls