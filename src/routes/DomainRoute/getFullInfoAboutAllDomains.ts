import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import Domain from "../../classes/Domain";
import User from "../../classes/User";
import IFullDomainData from "../../interfaces/domain/IFullDomainData";

function getFullInfoAboutAllDomainsRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    Domain.getFullInfoAboutAllDomains(user, (domainsData: Array<IFullDomainData>) => {
        res.json(domainsData);
    }, next);
}

export default getFullInfoAboutAllDomainsRoute