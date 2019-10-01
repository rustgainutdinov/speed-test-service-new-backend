import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import * as requestIp from 'request-ip';
import TestingServer from "../../classes/TestingServer";

function getTokenByAppKey(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['key']);
    } catch (e) {
        next(e);
        return
    }
    const ip: string = requestIp.getClientIp(req);
    const testingServer: TestingServer = new TestingServer(ip);
    testingServer.getToken(queryData.key, (token: string) => {
        res.json(token)
    }, next);
}

export default getTokenByAppKey