import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import Domain from "../../classes/Domain";

function changeDomainPriorityRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token', 'domainsList']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    Domain.changeDisplayPriority(user, JSON.parse(queryData.domainsList), () => {
        res.json('Ok');
    }, next);
}

export default changeDomainPriorityRoute