import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import Domain from "../../classes/Domain";

function getUrlsListByDomain(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['domain', 'token']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    const domain: Domain = new Domain(queryData.domain);
    domain.getUrlsList(user, (namesList: Array<string>) => {
        res.json(namesList);
    }, next)
}

export default getUrlsListByDomain