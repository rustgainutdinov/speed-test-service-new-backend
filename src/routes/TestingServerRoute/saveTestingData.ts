import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import * as requestIp from "request-ip";
import TestingServer from "../../classes/TestingServer";

function saveTestingData(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    const bodyData: IQueryData = req.body;
    try {
        checkOnParamsExist(queryData, ['token', 'id_test']);
        checkOnParamsExist(bodyData, ['result']);
    } catch (e) {
        next(e);
        return
    }
    const ip: string = requestIp.getClientIp(req);
    const testingServer: TestingServer = new TestingServer(ip);
    testingServer.saveTestingData(JSON.parse(bodyData.result), queryData.token, queryData.id_test, () => {
        res.json('Ok');
    }, next)
}

export default saveTestingData