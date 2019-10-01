import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import getInfoAboutUrlAndDomainForAdminPanel from "../../methods/pages/getInfoAboutUrlAndDomainForAdminPanel";
import IFullInfoAboutUrlsAndDomains from "../../interfaces/pages/IFullInfoAboutUrlsAndDomains";

function getInfoAboutUrlAndDomainForAdminPanelRoute(req: Request, res: Response, next: NextFunction): void {
    const queryData: IQueryData = req.query;
    try {
        checkOnParamsExist(queryData, ['token']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(queryData.token);
    getInfoAboutUrlAndDomainForAdminPanel(user, (data: IFullInfoAboutUrlsAndDomains) => {
        res.json(data);
    }, next)
}

export default getInfoAboutUrlAndDomainForAdminPanelRoute