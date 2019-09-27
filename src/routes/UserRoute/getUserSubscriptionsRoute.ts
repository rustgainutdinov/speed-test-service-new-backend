import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import IUserSubscriptions from "../../interfaces/user/IUserSubscriptions";

function getUserSubscriptionsRoute(req: Request, res: Response, next: NextFunction): void {
    const reqParams: IQueryData = req.query;
    try {
        checkOnParamsExist(reqParams, ['token']);
    } catch (e) {
        next(e);
        return
    }
    const user = new User(reqParams.token);
    user.getDomainsSubscriptions((userSubscriptions: IUserSubscriptions) => {
        res.json(userSubscriptions);
    }, next);
}

export default getUserSubscriptionsRoute