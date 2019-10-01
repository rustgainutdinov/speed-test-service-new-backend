import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import TestingServer from "../../classes/TestingServer";

function testUrlsList(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token', 'list_of_urls']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    TestingServer.testUrlsList(user, JSON.parse(queryData.list_of_urls), () => {
        res.json('Ok');
    }, next)
}

export default testUrlsList