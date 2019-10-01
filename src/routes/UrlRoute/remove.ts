import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import Url from "../../classes/Url";

function removeUrlRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token', 'url']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    const url: Url = new Url(queryData.url);
    url.remove(user, () => {
        res.json('Ok')
    }, next);
}

export default removeUrlRoute