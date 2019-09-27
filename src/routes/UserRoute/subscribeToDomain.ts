import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";

function subscribeToDomainRoute(req: Request, res: Response, next: NextFunction): void {
    const reqParams: IQueryData = req.query;
    try {
        checkOnParamsExist(reqParams, ['token', 'domain']);
    } catch (e) {
        next(e);
        return
    }
    const user = new User(reqParams.token);
    user.subscribeToDomain(reqParams.domain, () => {
        res.json('Ok');
    }, next);
}

export default subscribeToDomainRoute