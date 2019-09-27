import {NextFunction, Request, Response} from "express";
import IQueryData from "../../interfaces/db/IQueryData";
import checkOnParamsExist from "../../middleware/checkOnParamsExists";
import User from "../../classes/User";
import IPublicUserData from "../../interfaces/user/IPublicUserData";

function getUserDataByTokenRoute(req: Request, res: Response, next: NextFunction): void {
    const userData: IQueryData = req.query;
    try {
        checkOnParamsExist(userData, ['token']);
    } catch (e) {
        next(e);
        return
    }
    const user: User = new User(userData.token);
    user.getPublicUserDataByToken((publicUserData: IPublicUserData) => {
        res.json(publicUserData)
    }, next);
}

export default getUserDataByTokenRoute