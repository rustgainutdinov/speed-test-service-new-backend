import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import Url from "../../classes/Url";
import User from "../../classes/User";

function changeIsFavouriteFieldRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token', 'url', 'isFavourite']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    const url: Url = new Url(queryData.url);
    url.changeIsFavouriteField(queryData.isFavourite, user, () => {
        res.json('Ok');
    }, next)
}

export default changeIsFavouriteFieldRoute