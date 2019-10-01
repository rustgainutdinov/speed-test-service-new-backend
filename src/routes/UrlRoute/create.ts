import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import Url from "../../classes/Url";
import User from "../../classes/User";

function createUrlRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token', 'domainName', 'urlName', 'isFavourite']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    Url.create(queryData, user, () => {
        res.json('Ok');
    }, next)
}

export default createUrlRoute